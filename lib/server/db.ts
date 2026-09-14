import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Shared Postgres pool for this app's own tables (Neon, via DATABASE_URL).
 *
 * Lazily created for the same reason as getSupabase(): route modules are
 * evaluated at build time, where the env vars are not present.
 *
 * `max: 2` is deliberate. Each warm serverless instance holds its own pool, so
 * a large per-instance max multiplies into far more server-side connections
 * than Neon will allow. DATABASE_URL already points at the pooled (-pooler)
 * endpoint, which is what makes this safe.
 */
export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL must be set');
    }

    pool = new Pool({
      connectionString,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });

    // A pool that emits 'error' with no listener takes the process down.
    pool.on('error', (err) => {
      console.error('pg pool: idle client error', err);
    });
  }

  return pool;
}
