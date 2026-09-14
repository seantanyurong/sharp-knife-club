/**
 * The repair types we quote for, shared by the vision route (which validates
 * the model's answer against them) and the quote drawer (which labels them).
 *
 * A closed vocabulary on purpose: free text from the model would be phrased a
 * different way every time, and could name work we don't actually offer.
 */

export const REPAIR_KINDS = ['chip', 'tip', 'rust', 'bend', 'other'] as const;

export type RepairKind = (typeof REPAIR_KINDS)[number];

/** Customer-facing name for each repair. Ours, never the model's. */
export const REPAIR_LABELS: Record<RepairKind, string> = {
  chip: 'Large chip',
  tip: 'Broken tip',
  rust: 'De-rusting',
  bend: 'Straightening',
  other: 'Repair',
};

/** Beyond this we assume the model has lost the plot, not that you own 30 broken knives. */
const MAX_REPAIRS = 20;

function isRepairKind(value: unknown): value is RepairKind {
  return (
    typeof value === 'string' &&
    (REPAIR_KINDS as readonly string[]).includes(value)
  );
}

/**
 * Coerce whatever the model returned into a list of known repair kinds.
 *
 * Unrecognised entries become 'other' rather than being dropped: the length of
 * this list is what the customer is charged for, so silently discarding an
 * entry would quietly under-quote the job.
 */
export function normalizeRepairs(value: unknown): RepairKind[] {
  // A bare number is the older response shape, and is also what the model
  // falls back to when it ignores the schema. Keep the count, lose the detail.
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Array<RepairKind>(Math.max(0, Math.min(MAX_REPAIRS, Math.round(value)))).fill(
      'other',
    );
  }

  if (!Array.isArray(value)) return [];

  return value
    .slice(0, MAX_REPAIRS)
    .map((entry) => {
      if (isRepairKind(entry)) return entry;
      // Tolerate {"kind": "chip"} / {"type": "chip"} object entries.
      if (entry && typeof entry === 'object') {
        const inner = (entry as Record<string, unknown>).kind ??
          (entry as Record<string, unknown>).type;
        if (isRepairKind(inner)) return inner;
      }
      return 'other' as RepairKind;
    });
}

/** Collapse a list into display order with counts: chip, chip, rust -> chip ×2, rust. */
export function summarizeRepairs(
  repairs: RepairKind[],
): { kind: RepairKind; count: number }[] {
  return REPAIR_KINDS.map((kind) => ({
    kind,
    count: repairs.filter((r) => r === kind).length,
  })).filter((entry) => entry.count > 0);
}
