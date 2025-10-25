'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { notion } from '@/lib/notionClient';

export type OrderConstants = {
  pickupDate: string;
  deliveryDate: string;
  orderGroup: number;
  currentOrder: number;
  timing: string;
};

const ORDER_CONSTANTS_DATASOURCE_ID = '286b653f-dfd3-800c-adf4-000b46bcc393';

async function getOrderConstants(): Promise<OrderConstants> {
  try {
    const response: any = await notion.dataSources.query({
      data_source_id: ORDER_CONSTANTS_DATASOURCE_ID!,
    });

    const first = response?.results?.[0];
    if (!first) throw new Error('No rows returned from Notion');

    const constants: OrderConstants = {
      pickupDate: first.properties['Pickup Date']?.date?.start,
      deliveryDate: first.properties['Delivery Date']?.date?.start,
      orderGroup: first.properties['Order Group']?.number,
      currentOrder: first.properties['Current Order']?.number,
      timing: first.properties['Timing']?.rich_text?.[0]?.plain_text,
    };

    if (
      !constants.pickupDate ||
      !constants.deliveryDate ||
      typeof constants.orderGroup !== 'number' ||
      typeof constants.currentOrder !== 'number' ||
      typeof constants.timing !== 'string'
    ) {
      throw new Error('Notion data missing or malformed');
    }

    return constants;
  } catch (error: any) {
    console.error('An error occurred:', error?.message || error);
    throw error;
  }
}

export async function fetchOrderConstants(): Promise<OrderConstants> {
  noStore();

  try {
    return await getOrderConstants();
  } catch (err) {
    console.error('[fetchOrderConstants] Failed:', (err as any)?.message || err);
    throw new Error('Failed to fetch order constants.');
  }
}
