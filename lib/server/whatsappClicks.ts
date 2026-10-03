import { getSupabase } from './supabase';

/**
 * WhatsApp click → chat matching, in the Supabase `whatsapp_clicks` table.
 *
 * A wa.me link carries nothing about the visitor into WhatsApp, so the only
 * way to tie a chat back to the website session that started it is timing:
 * the page records each click with its PostHog distinct id, and when BotSpace
 * reports a new chat we claim the most recent unclaimed click just before it.
 *
 * The Express server did this before the API moved into this app on
 * 2026-08-15; the routes weren't ported, so chats stopped being attributed.
 */

/** How long before a chat starts a click can still be the one that opened it. */
const MATCH_WINDOW_MS = 10 * 60 * 1000;

export type WhatsAppClick = {
  id: string;
  distinct_id: string;
  origin: string | null;
  clicked_at: string;
  created_at: string;
  matched_at: string | null;
  matched_phone: string | null;
};

export async function recordWhatsAppClick(click: {
  distinctId: string;
  origin: string;
  clickedAt: string;
}) {
  const { error } = await getSupabase().from('whatsapp_clicks').insert({
    distinct_id: click.distinctId,
    origin: click.origin,
    clicked_at: click.clickedAt,
  });

  if (error) throw error;
}

/**
 * Claim the latest unmatched click inside the window, marking it so a second
 * chat can't claim it too. Returns null when nothing fits — a chat started
 * from a saved contact or a shared link has no click behind it.
 */
export async function claimWhatsAppClick(
  phone: string,
  chatStartedAt: Date = new Date(),
): Promise<WhatsAppClick | null> {
  const supabase = getSupabase();
  const since = new Date(chatStartedAt.getTime() - MATCH_WINDOW_MS);

  const { data: candidates, error } = await supabase
    .from('whatsapp_clicks')
    .select('*')
    .is('matched_at', null)
    .gte('clicked_at', since.toISOString())
    .lte('clicked_at', chatStartedAt.toISOString())
    .order('clicked_at', { ascending: false })
    .limit(3);

  if (error) throw error;

  // Conditional update: if another chat claimed this click between the select
  // and here, matched_at is no longer null, nothing updates, and we try the
  // next candidate.
  for (const click of (candidates ?? []) as WhatsAppClick[]) {
    const { data: claimed, error: claimError } = await supabase
      .from('whatsapp_clicks')
      .update({
        matched_at: new Date().toISOString(),
        matched_phone: phone,
      })
      .eq('id', click.id)
      .is('matched_at', null)
      .select('*');

    if (claimError) throw claimError;
    if (claimed && claimed.length > 0) return claimed[0] as WhatsAppClick;
  }

  return null;
}
