import { NextResponse } from 'next/server';
import { isSameOriginRequest } from '@/lib/server/requestGuards';
import { recordWhatsAppClick } from '@/lib/server/whatsappClicks';

/**
 * Records a WhatsApp link click so the chat it opens can be attributed back to
 * the visitor — see lib/server/whatsappClicks.ts. Called by WhatsAppLink.
 */
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return new NextResponse(null, { status: 404 });
  }

  let body: { distinctId?: unknown; origin?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const { distinctId, origin } = body;
  if (
    typeof distinctId !== 'string' ||
    !distinctId ||
    distinctId.length > 200 ||
    typeof origin !== 'string' ||
    origin.length > 100
  ) {
    return NextResponse.json({ error: 'invalid click' }, { status: 400 });
  }

  try {
    // Server time, not the browser's: the match is against when BotSpace
    // reports the chat, and a visitor's clock can be minutes out.
    await recordWhatsAppClick({
      distinctId,
      origin,
      clickedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Failed to record WhatsApp click', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
