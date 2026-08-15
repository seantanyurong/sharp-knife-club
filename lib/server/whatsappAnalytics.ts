import { posthog } from './posthogClient';

type BotspacePayload = {
  contact?: string;
  matchedClick?: { distinct_id?: string };
  [key: string]: unknown;
};

/**
 * Track a WhatsApp analytics event from a BotSpace webhook payload.
 */
export async function trackWhatsAppAnalytics(
  eventName: string,
  payload: BotspacePayload,
) {
  try {
    const phone = payload?.contact || null;

    if (!phone) {
      console.error('No phone found in BotSpace payload');
      return {
        success: false,
        error: 'No phone number in payload',
        statusCode: 400,
      };
    }

    // If we have a matched click with a PostHog ID, alias them together
    if (payload?.matchedClick?.distinct_id) {
      const posthogId = payload.matchedClick.distinct_id;

      posthog.alias({
        distinctId: phone,
        alias: posthogId,
      });

      console.log(`Aliased PostHog ID ${posthogId} with phone ${phone}`);
    }

    posthog.capture({
      distinctId: phone,
      event: eventName,
      properties: {
        phone,
        raw_payload: payload,
      },
    });

    // Serverless functions freeze after responding, so flush before returning.
    await posthog.flush();

    console.log(`Tracked ${eventName} for ${phone}`);

    return { success: true, statusCode: 200 };
  } catch (err) {
    console.error('Error handling BotSpace webhook:', err);
    return { success: false, error: 'Server error', statusCode: 500 };
  }
}
