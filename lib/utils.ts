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
        return property.rollup.array[0].phone_number?.replace(' ', '');
      }

      if (arrayType === 'rich_text') {
        return property.rollup.array[0].rich_text[0].plain_text;
      }
    }
  } else if (propertyType === 'checkbox') {
    return property.checkbox.toString();
  }
}

export function formatOrders(orders: QueryDataSourceResponse["results"]) {
  return orders
    .filter((order): order is PageObjectResponse => "properties" in order)
    .map(formatOrder);
}

export function formatOrder(order: PageObjectResponse) {
  const properties = order.properties;

  const pageId = order.id;
  const orderId = getTextFromNotionProperty(properties["ID"]) ?? "NA";
  const customerName =
    getTextFromNotionProperty(properties["Customer Name"]) ?? "NA";
  const whatsApp =
    getTextFromNotionProperty(properties["Customer Phone"]) ?? "NA";
  const address =
    getTextFromNotionProperty(properties["Customer Address"]) ?? "NA";
  const note = getTextFromNotionProperty(properties["Note"]) ?? "NA";
  const sharpeningNote = getTextFromNotionProperty(properties["Sharpening Note"]) ?? "NA";
  const collected =
    getTextFromNotionProperty(properties["Collected"]) === "true";
  const delivered =
    getTextFromNotionProperty(properties["Delivered"]) === "true";
  const submittedBeforePicture = getTextFromNotionProperty(properties["Submitted Before Picture"]) === "true";

  return {
    pageId,
    orderId,
    customerName,
    whatsApp,
    address,
    note,
    sharpeningNote,
    collected,
    delivered,
    submittedBeforePicture,
  };
}

