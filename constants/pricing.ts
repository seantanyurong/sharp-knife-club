/**
 * Single source of truth for sharpening prices.
 *
 * Used by the booking form (app/(no-layout)/order/page.tsx) and the instant
 * quote calculator (components/quote/quoteDrawer.tsx) — the two must never
 * disagree, or a customer is quoted one price and charged another.
 *
 * Blades: 3 → $20, 4 → $18, 5+ → $15 each. Scissors count as blades.
 * Repairs: $10 each (large chips, de-rusting, straightening). Small chips free.
 */

export const MIN_BLADES = 3;
export const REPAIR_PRICE = 10;

/** Per-blade price at a given order size. */
export function getBladePrice(blades: number) {
  switch (blades) {
    case 3:
      return 20;
    case 4:
      return 18;
    default:
      return 15;
  }
}

/** Total for the blades alone, excluding repairs. */
export function getBladesTotal(blades: number) {
  return getBladePrice(blades) * blades;
}
