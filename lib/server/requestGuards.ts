import { createHmac } from 'crypto';

/**
 * Guards for API routes that exist to serve this site's own pages and nothing
 * else.
 *
 * Read this before relying on it: a browser cannot lie about `Origin` or
 * `Sec-Fetch-Site` — they are forbidden headers, so page JavaScript cannot set
 * them — but `curl` can send whatever it likes. What this buys is real but
 * bounded:
 *
 *   - another *website* cannot call the route from a visitor's browser
 *   - a naive script or copied fetch() call fails
 *   - it does NOT stop someone who reads our JS and forges the header
 *
 * The per-IP rate limiter is what bounds that last case. Closing it properly
 * needs a challenge (Turnstile/hCaptcha) in front of the route.
 */

/** True when the request looks like it came from a page on this same site. */
export function isSameOriginRequest(request: Request): boolean {
  const host = request.headers.get('host');
  if (!host) return false;

  // Browsers send Sec-Fetch-Site on every fetch. When it's present it is
  // authoritative, and anything but same-origin is someone else's page.
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') return false;

  // Every browser POST carries Origin, same-origin ones included. A POST with
  // no Origin at all did not come from a browser.
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * The caller's IP, as seen by the platform edge.
 *
 * `NextRequest.ip` was removed after Next 14, so this reads the forwarded
 * headers directly. x-forwarded-for is a client-to-proxy chain; the first
 * entry is the original client.
 */
export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  // `next dev` has no proxy in front of it, so neither header exists. Without
  // this, every local request would be refused for being unattributable.
  if (process.env.NODE_ENV !== 'production') return '127.0.0.1';

  return null;
}

/**
 * Hash an IP before it touches the database.
 *
 * Keyed with QUOTE_IP_SALT so the stored value is not reversible by rainbow
 * table — an unsalted SHA of an IPv4 address is trivially brute-forced, the
 * whole space is only 2^32.
 */
export function hashIp(ip: string): string {
  const salt = process.env.QUOTE_IP_SALT;
  if (!salt) throw new Error('QUOTE_IP_SALT is not set');
  return createHmac('sha256', salt).update(ip).digest('hex').slice(0, 32);
}
