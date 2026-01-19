'use client';

import { fetchOrderConstants } from "@/app/actions/notion";
import { getNextPickupDate } from "@/constants/dates";
import { useEffect, useState } from "react";

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

export default function NextPickupDateClient({ pickupDate }: { pickupDate?: string }) {
  const [displayDate, setDisplayDate] = useState(() =>
    pickupDate ? formatForDisplay(pickupDate) : getNextPickupDate()
  );

  useEffect(() => {
    // If pickupDate was provided (from server), use it directly
    if (pickupDate) {
      setDisplayDate(formatForDisplay(pickupDate));
      return;
    }

    // Otherwise fetch from server action
    const loadOrderConstants = async () => {
      try {
        const constants = await fetchOrderConstants();
        setDisplayDate(formatForDisplay(constants.bookingOrderGroup.pickupDate));
      } catch (error) {
        console.error('Error fetching order constants:', error);
      }
    };

    loadOrderConstants();
  }, [pickupDate]);

  return <span>{displayDate}</span>;
}
