'use client';

import { fetchOrderConstants } from "@/app/actions/notion";
import { useEffect, useState } from "react";
import { formatForDisplay } from "@/lib/utils";


export default function NextPickupDateClient({ pickupDate }: { pickupDate?: string }) {
  const [displayDate, setDisplayDate] = useState(pickupDate ?? 'Loading...');

  useEffect(() => {
    if (pickupDate) {
      setDisplayDate(formatForDisplay(pickupDate));
      return;
    }

    const loadOrderConstants = async () => {
      try {
        const constants = await fetchOrderConstants();
        setDisplayDate(formatForDisplay(constants.bookingOrderGroup.pickupDateIso));
      } catch (error) {
        console.error('Error fetching order constants:', error);
      }
    };

    loadOrderConstants();
  }, [pickupDate]);

  return <span>{displayDate}</span>;
}
