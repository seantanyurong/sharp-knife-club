'use server';

import { unstable_noStore as noStore } from 'next/cache.js';
import { notion } from '@/lib/notionClient';
import type { QueryDataSourceParameters } from '@notionhq/client'

export type OrderConstants = {
  pickupDate: string;
  deliveryDate: string;
  orderGroup: number;
  currentOrder: number;
  timing: string;
  driverOrderGroup: number;
};

const ORDER_CONSTANTS_DATASOURCE_ID = '286b653f-dfd3-800c-adf4-000b46bcc393';
const ORDERS_DATASOURCE_ID = '9c015ed7-2d42-4689-b036-794ac2ba6295';

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
      driverOrderGroup: first.properties['Driver Order Group']?.number,
    };

    if (
      !constants.pickupDate ||
      !constants.deliveryDate ||
      typeof constants.orderGroup !== 'number' ||
      typeof constants.currentOrder !== 'number' ||
      typeof constants.timing !== 'string' ||
      typeof constants.driverOrderGroup !== 'number'
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

type GetOrdersParams = {
  orderGroup: number;
  driverId?: string;
  includeUrgent?: boolean;
};

export const getOrders = async ({ orderGroup, driverId, includeUrgent = false }: GetOrdersParams) => {
  try {
    type FilterUnion = NonNullable<QueryDataSourceParameters['filter']>;
    type AndArray = Extract<FilterUnion, { and: unknown }>['and'];

    const filters: AndArray = [
      { property: 'ID', rich_text: { contains: `${orderGroup}O` } },
    ];

    if (!includeUrgent) {
      filters.push({
        property: 'ID',
        rich_text: { does_not_contain: 'U' },
      });
    }

    if (driverId) {
      filters.push({
        property: 'Driver ID',
        rollup: {
          any: {
            "rich_text": {
              "contains": driverId,
            }
          },
        },
      })
    }

    const response = await notion.dataSources.query({
      data_source_id: ORDERS_DATASOURCE_ID,
      filter: { and: filters },
      sorts: [{ property: 'ID', direction: 'ascending' }],
    });
    return response.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
    } else {
      console.error('An error occurred:', error);
    }
  }
};

export const getPageBody = async (pageId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 50,
    });
    return response.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
    } else {
      console.error('An error occurred:', error);
    }
  }
};
