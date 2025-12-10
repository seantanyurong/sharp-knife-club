import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type QueryDataSourceResponse, type PageObjectResponse } from "@notionhq/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTextFromNotionProperty(property: PageObjectResponse['properties']['string']) {
  const propertyType = property.type;

  if (propertyType === 'title') {
    return property.title[0].plain_text
  } else if (propertyType === 'rich_text') {
    return property.rich_text[0].plain_text
  } else if (propertyType === 'rollup') {
    const rollupType = property.rollup.type;

    if (rollupType === 'array') {
      if (property.rollup.array.length === 0) {
        return '';
      }

      const arrayType = property.rollup.array[0].type;

      if (arrayType === 'title') {
        return property.rollup.array[0].title[0].plain_text;
      }

      if (arrayType === 'phone_number') {
        return property.rollup.array[0].phone_number;
      }

      if (arrayType === 'rich_text') {
        return property.rollup.array[0].rich_text[0].plain_text;
      }
    }
  }
}

export function formatOrders(orders: QueryDataSourceResponse['results']) {

  return orders
    .filter((order): order is PageObjectResponse => 'properties' in order)
    .map((order: PageObjectResponse) => {
      const properties = order.properties;
      const orderId = getTextFromNotionProperty(properties['ID']) || '';
      const customerName = getTextFromNotionProperty(properties['Customer Name']) || '';
      const whatsApp = getTextFromNotionProperty(properties['Customer Phone']) || '';
      const address = getTextFromNotionProperty(properties['Customer Address']) || '';
      const note = getTextFromNotionProperty(properties['Note']) || '';

      return {
        orderId,
        customerName,
        whatsApp,
        address,
        note
      };
    });
}

export function getDriverAssignedOrders(orders: QueryDataSourceResponse['results'], userId: string) {
  return orders
    .filter((order): order is PageObjectResponse => 'properties' in order)
    .filter((order) => {
      const properties = order.properties;
      const assignedDriverId = getTextFromNotionProperty(properties['Driver ID']) || '';
      return assignedDriverId === userId;
    });
}
