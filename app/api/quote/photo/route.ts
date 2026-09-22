import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import {
  getClientIp,
  hashIp,
  isSameOriginRequest,
} from '@/lib/server/requestGuards';
import { checkQuoteRateLimit } from '@/lib/server/rateLimit';
import { putToS3 } from '@/lib/server/aws';

/**
 * POST /api/quote/photo
 *
 * Stores the photo from the instant-quote drawer in S3 and returns its key.
 * Unlike /api/quote/analyze, which discards what it reads, this keeps the
 * image — so the drawer only calls it once the customer chooses to book.
 *
 * Not a public API: same-origin only, and rate limited per IP on the same
 * budget as the analyser.
 */

const MAX_BYTES = 2_000_000;

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const ip = getClientIp(request);
  if (!ip) {
    console.error('quote/photo: no client IP on request');
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const limit = await checkQuoteRateLimit(hashIp(ip));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      },
    );
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BYTES) {
    return NextResponse.json({ error: 'Image too large.' }, { status: 413 });
  }

  let body: Buffer;
  let contentType: string;
  try {
    const form = await request.formData();
    const file = form.get('image');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing image file.' }, { status: 400 });
    }
    if (!EXTENSIONS[file.type]) {
      return NextResponse.json(
        { error: 'Unsupported image format.' },
        { status: 400 },
      );
    }
    body = Buffer.from(await file.arrayBuffer());
    if (body.byteLength === 0) {
      return NextResponse.json({ error: 'The image is empty.' }, { status: 400 });
    }
    if (body.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: 'Image too large.' }, { status: 400 });
    }
    contentType = file.type;
  } catch (err) {
    console.error('quote/photo: could not read upload', err);
    return NextResponse.json({ error: 'Could not read the image.' }, { status: 400 });
  }

  // We name the object, never the client: the key comes back to us through
  // Stripe metadata, and a caller-supplied name would be a caller-supplied path.
  const key = `quotes/${randomUUID()}.${EXTENSIONS[contentType]}`;

  try {
    await putToS3({ key, body, contentType });
  } catch (err) {
    console.error('quote/photo: S3 upload failed', err);
    return NextResponse.json({ error: 'Could not store the image.' }, { status: 502 });
  }

  return NextResponse.json({ key });
}
