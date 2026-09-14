import { getPool } from './db';

/**
 * Per-IP rate limiting for the quote analyser, backed by the
 * check_quote_rate_limit Postgres function (db/migrations/001_quote_rate_limit.sql).
 *
 * The function does the deciding, not this module: it rolls expired windows,
 * compares against the limits and counts the request inside a single statement,
 * so concurrent requests for one IP cannot race past the cap.
 *
 * Two windows run independently: a short one to blunt bursts, and a daily one
 * to cap what any single address can cost us in a day. A real customer photographs
 * their knives once or twice; these numbers only bite on abuse.
 */

export const QUOTE_SHORT_LIMIT = 5;
export const QUOTE_SHORT_WINDOW = '10 minutes';
export const QUOTE_DAILY_LIMIT = 20;
export const QUOTE_DAILY_WINDOW = '1 day';

/**
 * What to do when the limiter itself is broken (the database unreachable, function
 * missing). Open means a database blip degrades to "unlimited" rather than
 * taking the feature down for everyone.
 *
 * That is a deliberate trade: knocking the database over would lift the limit,
 * but the origin check and OpenAI's own account limits still apply, and an
 * outage that silently disables customer quotes is the likelier real-world
 * failure. Flip to false to fail closed instead.
 */
const FAIL_OPEN = true;

export type RateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds: number;
  reason: 'ok' | 'burst' | 'daily' | 'unavailable';
};

export async function checkQuoteRateLimit(
  ipHash: string,
): Promise<RateLimitDecision> {
  try {
    const { rows } = await getPool().query<{
      allowed: boolean;
      retry_after_seconds: number;
      reason: RateLimitDecision['reason'];
    }>(
      `select allowed, retry_after_seconds, reason
         from check_quote_rate_limit($1, $2, $3::interval, $4, $5::interval)`,
      [
        ipHash,
        QUOTE_SHORT_LIMIT,
        QUOTE_SHORT_WINDOW,
        QUOTE_DAILY_LIMIT,
        QUOTE_DAILY_WINDOW,
      ],
    );

    const row = rows[0];
    if (!row) throw new Error('check_quote_rate_limit returned no row');

    return {
      allowed: row.allowed === true,
      retryAfterSeconds: Number(row.retry_after_seconds) || 0,
      reason: row.reason ?? 'ok',
    };
  } catch (err) {
    console.error('rateLimit: check failed', err);
    return {
      allowed: FAIL_OPEN,
      retryAfterSeconds: 0,
      reason: 'unavailable',
    };
  }
}
