import { NextResponse } from 'next/server';
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

/**
 * Shared handler for the three order picture uploads.
 *
 * Everything here is awaited. The Express version fired the Notion, Telegram
 * and BotSpace calls without awaiting, which is safe on a long-running process
 * but not on a serverless runtime, where the function freezes once the response
 * is returned.
 */
export async function handleOrderPictureUpload(
  request: Request,
  kind: PictureKind,
) {
  try {
    const formData = await request.formData();
    const orderId = formData.get('orderId')?.toString();
    const file = formData.get('image');

    if (!orderId) {
      return NextResponse.json({ message: 'orderId is required' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'No image uploaded' }, { status: 400 });
    }

    const pageId = await getNotionPageIdByOrderNumber(orderId);

    if (!pageId) {
      return NextResponse.json(
        { message: 'No page ID found for order' },
        { status: 400 },
      );
    }

    const imageUrl = await putToS3({
      key: `orders/${orderId}/${kind}/${file.name}`,
      body: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    });

    if (kind === 'collection') {
      await updateNotionOrderCollected(pageId, true);
      await sendMessageToTelegramNotifications(
        createCollectionNotificationMessage(orderId, imageUrl),
      );
      await sendCollectedMessage(orderId, imageUrl);
    } else if (kind === 'delivery') {
      await updateNotionOrderDelivered(pageId, true);
      await sendMessageToTelegramNotifications(
        createDeliveryNotificationMessage(orderId, imageUrl),
      );
      await sendDeliveredMessage(orderId, imageUrl);
    } else {
      await updateNotionOrderSubmittedBeforePicture(pageId, true);
      await addImageToNotionOrder(pageId, imageUrl);
    }

    return NextResponse.json({ ok: true, imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
