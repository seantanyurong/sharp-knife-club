/**
 * Shared plumbing for the one-off Notion <-> Stripe scripts, so the two can't
 * drift apart on how they parse addresses or match phone numbers.
 */

export const CUSTOMERS_DATASOURCE_ID = 'e4dcf0cf-c09d-4917-9d2a-b7e1eaedf976';

/** Stripe stores E.164; Notion is hand-entered, so normalise before matching. */
export function normalisePhone(phone) {
  const digits = (phone ?? '').replace(/[\s()-]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('65') && digits.length === 10) return `+${digits}`;
  if (/^[89]\d{7}$/.test(digits)) return `+65${digits}`;
  return digits ? `+${digits}` : null;
}

/**
 * Notion addresses are hand-entered, so this is deliberately forgiving:
 * "138 Grange Road\n09-01\nSINGAPORE 249617 SG", "…, Singapore509734" and
 * "…, S679668" all appear in the data. Pulls the 6-digit postal code out from
 * wherever it sits, then treats what's left as the address lines.
 *
 * Returns null when there's nothing usable, and also when the row carries two
 * different 6-digit numbers ("… sS721372, 731372") — one of them is a typo and
 * picking one silently would write a wrong address, so those get reported for a
 * human to fix in Notion instead.
 */
export function parseAddress(stored) {
  if (!stored) return null;

  let text = stored.replace(/\r?\n/g, ', ');

  const postalCandidates = [...new Set(text.match(/(?<!\d)\d{6}(?!\d)/g) ?? [])];
  if (postalCandidates.length > 1) return null;

  // Postal code: 6 digits, optionally prefixed by "Singapore"/"S" — which may
  // run straight into the digits ("Singapore509734", "S679668"), so no word
  // boundary before them. The lookarounds keep it from biting into a longer
  // run of digits.
  let postal;
  const postalMatch = text.match(/(?:singapore\s*|s)?(?<!\d)(\d{6})(?!\d)/i);
  if (postalMatch) {
    postal = postalMatch[1];
    text = text.replace(postalMatch[0], ' ');
  }

  const lines = text
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    // Drop country noise left behind once the postal code is removed.
    .filter((part) => !/^(singapore|sg|s)$/i.test(part))
    // Some rows repeat the postal code ("… , 198474, 198474"); it's already
    // captured above, so a bare 6-digit leftover is noise.
    .filter((part) => !/^\d{6}$/.test(part));

  if (lines.length === 0) return null;

  return {
    line1: lines[0],
    line2: lines.slice(1).join(', ') || undefined,
    postal_code: postal,
    country: 'SG',
  };
}

export async function loadNotionCustomers(notion) {
  const customers = [];
  let cursor;

  do {
    const page = await notion.dataSources.query({
      data_source_id: CUSTOMERS_DATASOURCE_ID,
      page_size: 100,
      start_cursor: cursor,
    });

    for (const row of page.results) {
      const props = row.properties;
      customers.push({
        notionId: row.id,
        lastEdited: row.last_edited_time,
        status: props.Status?.select?.name ?? null,
        name: props.Name?.title?.[0]?.plain_text ?? null,
        phone: normalisePhone(props.Phone?.phone_number),
        address: props.Address?.rich_text?.[0]?.plain_text ?? null,
      });
    }

    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);

  return customers;
}

/** One pass over every Stripe customer beats a search call per Notion row. */
export async function loadStripeCustomersByPhone(stripe) {
  const byPhone = new Map();

  for await (const customer of stripe.customers.list({ limit: 100 })) {
    const phone = normalisePhone(customer.phone);
    if (!phone) continue;
    // Keep the oldest record when a number somehow has duplicates.
    const existing = byPhone.get(phone);
    if (!existing || customer.created < existing.created) {
      byPhone.set(phone, customer);
    }
  }

  return byPhone;
}

/**
 * Notion holds duplicate rows for some numbers. Prefer an address that has a
 * postal code, then the most recently edited row.
 */
export function isBetterCandidate(candidate, current) {
  const candidateHasPostal = Boolean(candidate.address.postal_code);
  const currentHasPostal = Boolean(current.address.postal_code);

  if (candidateHasPostal !== currentHasPostal) return candidateHasPostal;
  return (candidate.lastEdited ?? '') > (current.lastEdited ?? '');
}
