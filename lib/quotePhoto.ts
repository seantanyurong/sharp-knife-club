/**
 * The quote photo's S3 key, carried from the instant-quote drawer through
 * /order and /checkout to the Stripe webhook, which attaches it to the Notion
 * order. Only the key travels, never the image.
 */

export const QUOTE_PHOTO_STORAGE_KEY = 'quote_photo';

const KEY_PATTERN =
  /^quotes\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

/**
 * sessionStorage lives as long as the tab does, so without an expiry a photo
 * from a quote taken this morning could be stapled to an unrelated booking
 * made from the same tab this afternoon.
 */
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export function isQuotePhotoKey(value: unknown): value is string {
  return typeof value === 'string' && KEY_PATTERN.test(value);
}

export function saveQuotePhotoKey(key: string) {
  try {
    sessionStorage.setItem(
      QUOTE_PHOTO_STORAGE_KEY,
      JSON.stringify({ key, ts: Date.now() }),
    );
  } catch {
    /* private mode / storage full — the photo is a nice-to-have */
  }
}

export function clearQuotePhotoKey() {
  try {
    sessionStorage.removeItem(QUOTE_PHOTO_STORAGE_KEY);
  } catch {
    /* as above */
  }
}

/** The stored key, or null if there is none, it is stale, or it is malformed. */
export function readQuotePhotoKey(): string | null {
  try {
    const raw = sessionStorage.getItem(QUOTE_PHOTO_STORAGE_KEY);
    if (!raw) return null;

    const { key, ts } = JSON.parse(raw) as { key?: unknown; ts?: unknown };
    if (!isQuotePhotoKey(key)) return null;
    if (typeof ts !== 'number' || Date.now() - ts > MAX_AGE_MS) {
      clearQuotePhotoKey();
      return null;
    }

    return key;
  } catch {
    return null;
  }
}
