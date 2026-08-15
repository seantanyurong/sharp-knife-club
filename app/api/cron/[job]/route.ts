import { NextResponse } from 'next/server';
import {
  isBookingEnded,
  isDeliveryTomorrow,
  isPickupTomorrow,
  isServiceEnded,
  updateOrderConstantsToNextOrderGroup,
  updateServiceOrderConstantsToNextOrderGroup,
} from '@/lib/server/notion';
import {
  createMessageFromOrders,
  createOrderStatusMessage,
  createBookingOrderGroupUpdatedMessage,
  createServiceOrderGroupUpdatedMessage,
  sendMessageToTelegramNotifications,
} from '@/lib/server/telegram';
import {
  send180DayReminder,
  sendCollectionReminder,
  sendDeliveryReminder,
  sendRequestedReminder,
  sendProspectReminder,
} from '@/lib/server/botspace';
import { runStabilityTestOrderDetails } from '@/lib/server/stabilityTests';

// Each job mirrors one cron.schedule() from the old Express server. The
// scheduling itself lives on the droplet; this only exposes the work.
const JOBS: Record<string, () => Promise<string>> = {
  // was: '0 17 * * *' — daily order status
  'order-status': async () => {
    const message = await createOrderStatusMessage();
    await sendMessageToTelegramNotifications(message);
    return 'order status sent';
  },

  // was: '0 18 * * *' — pickup reminder, only if pickup is tomorrow
  'pickup-reminder': async () => {
    if (!(await isPickupTomorrow())) return 'skipped: no pickup tomorrow';
    await runStabilityTestOrderDetails();
    await sendCollectionReminder();
    return 'pickup reminders sent';
  },

  // was: '15 18 * * *' — sharpener + driver messages
  'order-messages': async () => {
    if (!(await isPickupTomorrow())) return 'skipped: no pickup tomorrow';
    const { sharpenerMessage, driverMessage } = await createMessageFromOrders();
    await sendMessageToTelegramNotifications(sharpenerMessage);
    await sendMessageToTelegramNotifications(driverMessage);
    return 'order messages sent';
  },

  // was: '0 18 * * *' — delivery reminder, only if delivery is tomorrow
  'delivery-reminder': async () => {
    if (!(await isDeliveryTomorrow())) return 'skipped: no delivery tomorrow';
    await sendDeliveryReminder();
    return 'delivery reminders sent';
  },

  // was: '0 20 * * 3' — Wednesday 180-day + requested reminders
  'weekly-reminders': async () => {
    await send180DayReminder();
    await sendRequestedReminder();
    return 'weekly reminders sent';
  },

  // was: '0 20 * * 4' — Thursday prospect follow-up
  'prospect-reminder': async () => {
    await sendProspectReminder();
    return 'prospect reminders sent';
  },

  // was: '30 18 * * *' — roll booking group forward once booking has ended
  'booking-rollover': async () => {
    if (!(await isBookingEnded())) return 'skipped: booking not ended';
    await updateOrderConstantsToNextOrderGroup();
    const message = await createBookingOrderGroupUpdatedMessage();
    await sendMessageToTelegramNotifications(message);
    return 'booking group rolled over';
  },

  // was: '0 16 * * *' — roll service group forward once service has ended
  'service-rollover': async () => {
    if (!(await isServiceEnded())) return 'skipped: service not ended';
    await updateServiceOrderConstantsToNextOrderGroup();
    const message = await createServiceOrderGroupUpdatedMessage();
    await sendMessageToTelegramNotifications(message);
    return 'service group rolled over';
  },
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ job: string }> },
) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    console.error('CRON_SECRET is not set');
    return NextResponse.json({ error: 'not configured' }, { status: 500 });
  }

  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { job } = await params;
  const handler = JOBS[job];

  if (!handler) {
    return NextResponse.json(
      { error: `unknown job "${job}"`, available: Object.keys(JOBS) },
      { status: 404 },
    );
  }

  try {
    console.log(`[CRON] running ${job}`);
    const result = await handler();
    console.log(`[CRON] ${job}: ${result}`);
    return NextResponse.json({ job, result });
  } catch (err) {
    console.error(`[CRON] ${job} failed`, err);
    return NextResponse.json({ job, error: 'job failed' }, { status: 500 });
  }
}
