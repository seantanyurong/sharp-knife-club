'use server';

import { unstable_noStore as noStore } from 'next/cache.js';
import { notion } from '@/lib/notionClient';
import type { QueryDataSourceParameters, PageObjectResponse } from '@notionhq/client'
import { getOrderConstants } from '@/lib/api';

const ORDERS_DATASOURCE_ID = '9c015ed7-2d42-4689-b036-794ac2ba6295';

export type OrderGroupDetails = {
  orderGroupNumber: number;
  pickupDate: string;
  deliveryDate: string;
  timing: string;
  currentOrder: number;
};

export type OrderConstants = {
  bookingOrderGroup: OrderGroupDetails;
  bookingOrderGroupArray: OrderGroupDetails[];
  serviceOrderGroup: OrderGroupDetails;
};

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
      sorts: [
        { property: 'Pickup Order', direction: 'ascending' },
        { property: 'ID', direction: 'ascending' }
      ],
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

export const getOrderByPageId = async (
  pageId: string
): Promise<PageObjectResponse> => {
  const response = await notion.pages.retrieve({ page_id: pageId });

  // Narrow the union
  if (!("properties" in response)) {
    throw new Error("Retrieved page is a partial page object");
  }

  return response;
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

