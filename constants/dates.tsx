const getNextPickupDate = (): string => {
  const startDate = new Date(Date.UTC(2025, 1, 1));
  const currentDate = new Date();
  const currentDateUTC = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()),
  );

  const diffInWeeks = Math.floor((currentDateUTC.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

  const nextPickupWeek = diffInWeeks + 1;

  const nextPickupDate = new Date(startDate);
  nextPickupDate.setDate(startDate.getDate() + nextPickupWeek * 7);

  const dayOfWeek = nextPickupDate.getUTCDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  nextPickupDate.setDate(nextPickupDate.getDate() + daysUntilSaturday);

  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  return nextPickupDate.toLocaleDateString('en-US', options);
};

export const NEXT_PICKUP_DATE = getNextPickupDate();

// export const NEXT_PICKUP_DATE = 'Apr 12, 2025';
