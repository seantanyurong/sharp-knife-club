'use client';

import { getNextPickupDate } from "@/constants/dates";

function formatForDisplay(isoDate: string) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Singapore',
  });
}

export default function NextPickupDateClient({ pickupDate }: { pickupDate: string }) {
  // fallback to avoid error
  if (!pickupDate) {
    const regularDate = getNextPickupDate();
    return <span>{regularDate}</span>
  }

  return <span>{formatForDisplay(pickupDate)}</span>;
}
