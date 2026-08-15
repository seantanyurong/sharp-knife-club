import { NextResponse } from 'next/server';
import {
  getNotionCustomerIdByPhone,
  insertNotionProspect,
} from '@/lib/server/notion';

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { message: 'name and phone are required' },
        { status: 400 },
      );
    }

    const phoneStr = phone.toString().replaceAll(' ', '');

    const existingCustomerId = await getNotionCustomerIdByPhone(phoneStr);
    if (existingCustomerId) {
      return NextResponse.json(
        { message: 'Customer with this phone already exists' },
        { status: 409 },
      );
    }

    const prospect = await insertNotionProspect({
      name: name.toString(),
      phone: phoneStr,
    });

    return NextResponse.json(prospect);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
