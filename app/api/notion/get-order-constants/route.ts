import { NextResponse } from 'next/server';
import { getOrderConstants } from '@/lib/server/notion';
import { formatDate } from '@/lib/server/orderUtils';

export async function GET() {
  try {
    const orderConstants = await getOrderConstants();

    return NextResponse.json({
      bookingOrderGroup: {
        ...orderConstants.bookingOrderGroup,
        pickupDate: formatDate(orderConstants.bookingOrderGroup.pickupDate),
        pickupDateIso: orderConstants.bookingOrderGroup.pickupDate,
        deliveryDate: formatDate(orderConstants.bookingOrderGroup.deliveryDate),
        deliveryDateIso: orderConstants.bookingOrderGroup.deliveryDate,
      },
      bookingOrderGroupArray: orderConstants.bookingOrderGroupArray.map(
        (orderGroup) => ({
          ...orderGroup,
          pickupDate: formatDate(orderGroup.pickupDate),
          pickupDateIso: orderGroup.pickupDate,
          deliveryDate: formatDate(orderGroup.deliveryDate),
          deliveryDateIso: orderGroup.deliveryDate,
        }),
      ),
      serviceOrderGroup: {
        ...orderConstants.serviceOrderGroup,
        pickupDate: formatDate(orderConstants.serviceOrderGroup.pickupDate),
        pickupDateIso: orderConstants.serviceOrderGroup.pickupDate,
        deliveryDate: formatDate(orderConstants.serviceOrderGroup.deliveryDate),
        deliveryDateIso: orderConstants.serviceOrderGroup.deliveryDate,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
