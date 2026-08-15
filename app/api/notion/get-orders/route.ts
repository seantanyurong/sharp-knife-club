import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/server/notion';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderGroup = searchParams.get('orderGroup');
    const driverId = searchParams.get('driverId');
    const sharpenerId = searchParams.get('sharpenerId');
    const includeUrgent = searchParams.get('includeUrgent');

    const orders = await getOrders({
      orderGroup: Number(orderGroup),
      driverId: driverId ?? undefined,
      sharpenerId: sharpenerId ?? undefined,
      // Query params arrive as strings; only an explicit "true" counts.
      includeUrgent: includeUrgent === 'true',
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
