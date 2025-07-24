import { getNextPickupDate } from '../constants/dates';

export default function NextPickupDate() {
  const NEXT_PICKUP_DATE = getNextPickupDate();

  return <span>{NEXT_PICKUP_DATE}</span>;
}
