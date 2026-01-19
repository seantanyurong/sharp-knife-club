'use server';

import { unstable_noStore as noStore } from 'next/cache.js';
import { notion } from '@/lib/notionClient';
import type { QueryDataSourceParameters, PageObjectResponse } from '@notionhq/client'

export type OrderGroupDetails = {
  orderGroupNumber: number;
  pickupDate: string;
  deliveryDate: string;
  timing: string;
  currentOrder: number;
};

export type OrderConstants = {
  bookingOrderGroup: OrderGroupDetails;
  driverOrderGroup: OrderGroupDetails;
};

const ORDER_STATUS_DATASOURCE_ID = '2edb653f-dfd3-8033-83ee-000b9e670c37';
const ORDERS_DATASOURCE_ID = '9c015ed7-2d42-4689-b036-794ac2ba6295';


async function getOrderStatusRow(name: 'Booking' | 'Driver'): Promise<{ orderGroupId: string; orderGroupNumber: number }> {
  const response: any = await notion.dataSources.query({
    data_source_id: ORDER_STATUS_DATASOURCE_ID,
    filter: {
      property: 'Name',
      title: { equals: name },
    },
  });

  const row = response?.results?.[0];
  if (!row) throw new Error(`No "${name}" row found in Order Status`);

  const relation = row.properties['Order Group']?.relation?.[0];
  if (!relation?.id) throw new Error(`No Order Group relation found for "${name}"`);

  // Get the order group number from the relation's title
  const orderGroupPage: any = await notion.pages.retrieve({ page_id: relation.id });
  const orderGroupNumber = parseInt(orderGroupPage.properties['Name']?.title?.[0]?.plain_text, 10);

  if (isNaN(orderGroupNumber)) throw new Error(`Invalid order group number for "${name}"`);

  return { orderGroupId: relation.id, orderGroupNumber };
}

async function getOrderGroupDetails(orderGroupId: string): Promise<{ pickupDate: string; deliveryDate: string; timing: string }> {
  const page: any = await notion.pages.retrieve({ page_id: orderGroupId });

  const pickupDate = page.properties['Pickup Date']?.date?.start;
  const deliveryDate = page.properties['Delivery Date']?.date?.start;
  const timing = page.properties['Timing']?.rich_text?.[0]?.plain_text;

  if (!pickupDate || !deliveryDate || typeof timing !== 'string') {
    throw new Error('Order Group missing required fields');
  }

  return { pickupDate, deliveryDate, timing };
}

async function countOrdersForGroup(orderGroup: number): Promise<number> {
  const response: any = await notion.dataSources.query({
    data_source_id: ORDERS_DATASOURCE_ID,
    filter: {
      property: 'ID',
      rich_text: { contains: `${orderGroup}O` },
    },
  });

  return response?.results?.length ?? 0;
}

async function getOrderConstants(): Promise<OrderConstants> {
  try {
    // Fetch Booking and Driver status in parallel
    const [bookingStatus, driverStatus] = await Promise.all([
      getOrderStatusRow('Booking'),
      getOrderStatusRow('Driver'),
    ]);

    // Get order group details and count orders for both groups in parallel
    const [bookingDetails, driverDetails, bookingOrderCount, driverOrderCount] = await Promise.all([
      getOrderGroupDetails(bookingStatus.orderGroupId),
      getOrderGroupDetails(driverStatus.orderGroupId),
      countOrdersForGroup(bookingStatus.orderGroupNumber),
      countOrdersForGroup(driverStatus.orderGroupNumber),
    ]);

    const constants: OrderConstants = {
      bookingOrderGroup: {
        orderGroupNumber: bookingStatus.orderGroupNumber,
        pickupDate: bookingDetails.pickupDate,
        deliveryDate: bookingDetails.deliveryDate,
        timing: bookingDetails.timing,
        currentOrder: bookingOrderCount,
      },
      driverOrderGroup: {
        orderGroupNumber: driverStatus.orderGroupNumber,
        pickupDate: driverDetails.pickupDate,
        deliveryDate: driverDetails.deliveryDate,
        timing: driverDetails.timing,
        currentOrder: driverOrderCount,
      },
    };

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

