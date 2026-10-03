import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { trackWhatsAppAnalytics } from '@/lib/server/whatsappAnalytics';
import { claimWhatsAppClick } from '@/lib/server/whatsappClicks';
import { toPhoneDistinctId } from '@/lib/phone';

/**
 * BotSpace webhook: one URL per WhatsApp funnel step, e.g.
 *
 *   POST /api/analytics/whatsapp/chat_started?token=<BOTSPACE_ANALYTICS_TOKEN>
 *
 * with a body carrying at least `contact` (the customer's number). Each step
 * becomes a `whatsapp_<step>` PostHog event keyed by that number; a new chat is
 * also matched to the website click that opened it, which merges the visitor's
 * web history into the same person.
 */
const EVENTS = {
  chat_started: 'whatsapp_chat_started',
  chat_order_request: 'whatsapp_chat_order_request',
  chat_order_conversion: 'whatsapp_chat_order_conversion',
} as const;

function hasValidToken(request: Request): boolean {
  const expected = process.env.BOTSPACE_ANALYTICS_TOKEN;
  if (!expected) {
    console.error('BOTSPACE_ANALYTICS_TOKEN is not set');
    return false;
  }

  const given = new URL(request.url).searchParams.get('token') ?? '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ event: string }> },
) {
  if (!hasValidToken(request)) {
    return new NextResponse(null, { status: 404 });
  }

  const { event } = await params;
  const eventName = EVENTS[event as keyof typeof EVENTS];
  if (!eventName) {
    return NextResponse.json({ error: 'unknown event' }, { status: 404 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const contact = typeof payload.contact === 'string' ? payload.contact : '';

  if (event === 'chat_started' && contact) {
    try {
      payload.matchedClick = await claimWhatsAppClick(
        toPhoneDistinctId(contact),
      );
    } catch (err) {
      // Attribution is a bonus; the chat event itself still gets recorded.
      console.error('WhatsApp click matching failed', err);
      payload.matchedClick = null;
    }
  }

  const result = await trackWhatsAppAnalytics(eventName, payload);
  return NextResponse.json(
    result.success ? { ok: true } : { error: result.error },
    { status: result.statusCode },
  );
}
