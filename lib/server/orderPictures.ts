import sharp from 'sharp';
import { NextResponse, after } from 'next/server';
import { putToS3 } from './aws';
import {
  getNotionPageIdByOrderNumber,
  updateNotionOrderCollected,
  updateNotionOrderDelivered,
  updateNotionOrderSubmittedBeforePicture,
  addImageToNotionOrder,
} from './notion';
import {
  sendMessageToTelegramNotifications,
  createCollectionNotificationMessage,
  createDeliveryNotificationMessage,
} from './telegram';
import { sendCollectedMessage, sendDeliveredMessage } from './botspace';

export type PictureKind = 'collection' | 'delivery' | 'before';

/** Simple step timer for upload latency breakdown. */
function createTimer() {
  const start = performance.now();
  const marks: Record<string, number> = {};
  let last = start;
  return {
    /** Record elapsed ms since the previous mark under `label`. */
    mark(label: string) {
      const now = performance.now();
      marks[label] = Math.round((now - last) * 10) / 10;
      last = now;
      return marks[label];
    },
    total() {
      return Math.round((performance.now() - start) * 10) / 10;
    },
    marks,
  };
}

/** Server-side safety net: ensure no raw 12MP photo lands in S3.
 *  Max 1600 px on the longest side, JPEG quality 0.82.
 *  Skips re-encoding for files already under 500 KB. */
async function compressBuffer(buf: Buffer, contentType?: string): Promise<{
  buffer: Buffer;
  mime: string;
}> {
  if (buf.length < 500_000) return { buffer: buf, mime: contentType ?? 'image/jpeg' };

  const meta = await sharp(buf).metadata();
  const maxDim = Math.max(meta.width ?? 0, meta.height ?? 0);
  // Only sharp if it's actually big enough to matter
  if (maxDim <= 1600) return { buffer: buf, mime: contentType ?? 'image/jpeg' };

  const resized = await sharp(buf)
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return { buffer: resized, mime: 'image/jpeg' };
}

/**
 * Shared handler for the three order picture uploads.
 */
export async function handleOrderPictureUpload(
  request: Request,
  kind: PictureKind,
) {
  const timer = createTimer();
  try {
    const formData = await request.formData();
    const orderId = formData.get('orderId')?.toString();
    const pageIdFromClient = formData.get('pageId')?.toString();
    const customerName = formData.get('customerName')?.toString();
    const whatsApp = formData.get('whatsApp')?.toString();
    const file = formData.get('image');
    const fileSize = file instanceof File ? file.size : 0;

    timer.mark('parse-form');

    if (!orderId) {
      return NextResponse.json({ message: 'orderId is required' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'No image uploaded' }, { status: 400 });
    }

    // The dashboard already knows the Notion pageId for this order, so the
    // client sends it along and we skip the (slow) Notion query entirely.
    // Fall back to the query for callers that don't pass it.
    const pageId = pageIdFromClient || (await getNotionPageIdByOrderNumber(orderId));

    // Start the S3 upload in parallel with any remaining lookup — the S3 key
    // only needs orderId (from the form), not the Notion pageId, so there's
    // no reason to wait on Notion before compressing and uploading.
    const [resolvedPageId, imageUrl] = await Promise.all([
      pageId,
      (async () => {
        const raw = Buffer.from(await file.arrayBuffer());
        timer.mark('read-file');
        const { buffer, mime } = await compressBuffer(raw, file.type);
        timer.mark('compress');
        return putToS3({
          key: `orders/${orderId}/${kind}/${file.name.replace(/\.[^.]+$/, '.jpg')}`,
          body: buffer,
          contentType: mime,
        });
      })(),
    ]);

    timer.mark('s3-upload');

    if (!resolvedPageId) {
      return NextResponse.json(
        { message: 'No page ID found for order' },
        { status: 400 },
      );
    }

    // The image is in S3 — that's the user-facing guarantee. Notion, Telegram
    // and WhatsApp run AFTER the response is sent so the driver sees "done"
    // the moment the upload lands, not after notification latency.
    const customer =
      customerName && whatsApp ? { name: customerName, phone: whatsApp } : undefined;

    after(async () => {
      try {
        // Fire off post-S3 side effects in parallel — none depend on each other.
        if (kind === 'collection') {
          await Promise.all([
            updateNotionOrderCollected(resolvedPageId, true),
            sendMessageToTelegramNotifications(
              createCollectionNotificationMessage(orderId, imageUrl),
            ),
            sendCollectedMessage(orderId, imageUrl, customer),
          ]);
        } else if (kind === 'delivery') {
          await Promise.all([
            updateNotionOrderDelivered(resolvedPageId, true),
            sendMessageToTelegramNotifications(
              createDeliveryNotificationMessage(orderId, imageUrl),
            ),
            sendDeliveredMessage(orderId, imageUrl, customer),
          ]);
        } else {
          await Promise.all([
            updateNotionOrderSubmittedBeforePicture(resolvedPageId, true),
            addImageToNotionOrder(resolvedPageId, imageUrl),
          ]);
        }
      } catch (err) {
        // Background task — a notification failure must not fail the upload
        // the driver already saw succeed.
        console.error(`[upload:${kind}] post-upload notifications failed`, err);
      }
    });

    const timings = { ...timer.marks, total: timer.total() };
    console.log(
      `[upload:${kind}] order=${orderId} size=${fileSize}B pageIdFromClient=${!!pageIdFromClient}`,
      timings,
    );

    return NextResponse.json({ ok: true, imageUrl, timings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}