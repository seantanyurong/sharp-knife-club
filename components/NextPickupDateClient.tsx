'use client';

import { fetchOrderConstants } from "@/app/actions/notion";
import { useEffect, useState } from "react";

// function formatForDisplay(isoDate: string) {
//   if (!isoDate) return '';
//   const [y, m, d] = isoDate.split('-').map(Number);
//   const date = new Date(Date.UTC(y, m - 1, d));
//   return date.toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     timeZone: 'Asia/Singapore',
//   });
// }

export default function NextPickupDateClient({ pickupDate }: { pickupDate?: string }) {
  const [displayDate, setDisplayDate] = useState(pickupDate ?? 'Loading...');

  useEffect(() => {
    if (pickupDate) {
      setDisplayDate(pickupDate);
      return;
    }

    const loadOrderConstants = async () => {
      try {
        const constants = await fetchOrderConstants();
        setDisplayDate(constants.bookingOrderGroup.pickupDate);
      } catch (error) {
        console.error('Error fetching order constants:', error);
      }
    };

    loadOrderConstants();
  }, [pickupDate]);

  return <span>{displayDate}</span>;
}
