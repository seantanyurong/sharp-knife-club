import { NextResponse } from 'next/server';
import { updateNotionPagePickupOrder } from '@/lib/server/notion';

type PickupOrder = {
  pageId: string;
  position: number;
};

export async function PUT(request: Request) {
  try {
    const { pickupOrder } = (await request.json()) as {
      pickupOrder: PickupOrder[];
    };

    if (!Array.isArray(pickupOrder)) {
      return NextResponse.json(
        { message: 'pickupOrder array is required' },
        { status: 400 },
      );
    }

    await Promise.all(
      pickupOrder.map((order) =>
        updateNotionPagePickupOrder(order.pageId, order.position),
      ),
    );

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
