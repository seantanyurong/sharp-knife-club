import { fetchOrderConstants } from '@/app/actions/notion';
import NextPickupDateClient from './NextPickupDateClient';

export default async function NextPickupDate() {
  const constants = await fetchOrderConstants();
  return <NextPickupDateClient pickupDate={constants.pickupDate} />;
}
