'use client';

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

export default function NextPickupDateClient({ pickupDate }: { pickupDate: string }) {
  const [nextPickupDate, setNextPickupDate] = useState(getNextPickupDate());

  const fetchOrderConstants = async () => {
    try {
      const response = await fetch('/api/notion/getOrderConstants', {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Expires": "0",
        }
      });
      const result = await response.json();

      setNextPickupDate(formatForDisplay(result.data.pickupDate));
    } catch (error) {
      console.error('Error fetching order constants:', error);
    }
  }

  useEffect(() => {
    fetchOrderConstants();
  }, [pickupDate]);

  return <span>{formatForDisplay(pickupDate) || nextPickupDate}</span>;
}
