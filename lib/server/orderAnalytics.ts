import { posthog } from './posthogClient';
import { toPhoneDistinctId } from '@/lib/phone';

/**
 * Records a paid order in PostHog, keyed by the customer's phone number — the
 * same person the WhatsApp events land on (lib/server/whatsappAnalytics.ts).
 *
 * When Checkout carried the visitor's browser distinct id, it is aliased in, so
 * the order joins up with the pages, campaign and quote that led to it.
 *
 * Never throws: an analytics failure must not fail the Stripe webhook, which
 * would make Stripe retry an order we already created.
 */
export async function trackOrderPaid(order: {
  phone: string;
  posthogDistinctId?: string;
  stripeSessionId: string;
  total: number;
  knives: number;
  repairs: number;
  custom: boolean;
  orderGroup: number;
  hasQuotePhoto: boolean;
}) {
  try {
    const distinctId = toPhoneDistinctId(order.phone);

    if (order.posthogDistinctId && order.posthogDistinctId !== distinctId) {
      posthog.alias({ distinctId, alias: order.posthogDistinctId });
    }

    posthog.capture({
      distinctId,
      event: 'order_paid',
      properties: {
        phone: distinctId,
        revenue: order.total,
        currency: 'SGD',
        knives: order.knives,
        repairs: order.repairs,
        custom: order.custom,
        order_group: order.orderGroup,
        has_quote_photo: order.hasQuotePhoto,
        stripe_session_id: order.stripeSessionId,
        $set: { phone: distinctId },
      },
    });

    // Serverless functions freeze after responding, so flush before returning.
    await posthog.flush();
  } catch (err) {
    console.error('Failed to track order_paid', err);
  }
}
