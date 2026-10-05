import {
  getOrderConstants,
  getOrders,
  getCustomers180DaysOld,
  updateNotionCustomer180DayFollowUp,
  clearNotionCustomerReminderDate,
  getCustomersWithReminderDates,
  getProspectsCreatedThisWeek,
  formatOrders,
} from './notion';
import { sendReminder } from './whatsapp';

// NOTE: these all use `for...of` rather than `forEach(async ...)`. forEach does
// not await its callback, so on a serverless runtime the function can freeze
// before the webhook calls complete.
const sendServiceGroupReminder = async (reminderType: 'collection' | 'delivery') => {
  const orderConstants = await getOrderConstants();
  const serviceGroup = orderConstants.serviceOrderGroup;
  const orders = await getOrders({
    orderGroup: serviceGroup.orderGroupNumber,
    includeUrgent: false,
  });

  if (!orders || orders.length === 0) {
    console.log(`No orders to send ${reminderType} reminders for`);
    return;
  }

  const formattedOrders = formatOrders(orders);

  for (const order of formattedOrders) {
    await sendReminder({
      name: order.customerName,
      phone: order.whatsApp,
      timing: serviceGroup.timing,
      address: order.address,
      note: order.note,
      reminderType,
    });
  }
};

export const sendCollectionReminder = async () =>
  sendServiceGroupReminder('collection');

export const sendDeliveryReminder = async () =>
  sendServiceGroupReminder('delivery');

export const send180DayReminder = async () => {
  const customers = await getCustomers180DaysOld();

  for (const customer of customers as any[]) {
    const customerBody = {
      id: customer.id,
      name: customer.properties['Name'].title[0].plain_text,
      phone: customer.properties['Phone'].phone_number.replaceAll(' ', ''),
      reminderType: 'oneeighty' as const,
    };
    await sendReminder(customerBody);
    await updateNotionCustomer180DayFollowUp(customerBody.id, true);
  }
};

export const sendRequestedReminder = async () => {
  const customers = await getCustomersWithReminderDates();

  for (const customer of customers as any[]) {
    const customerBody = {
      id: customer.id,
      name: customer.properties['Name'].title[0].plain_text,
      phone: customer.properties['Phone'].phone_number.replaceAll(' ', ''),
      reminderType: 'request' as const,
    };
    await sendReminder(customerBody);
    await clearNotionCustomerReminderDate(customerBody.id);
  }
};

export const sendProspectReminder = async () => {
  const prospects = await getProspectsCreatedThisWeek();

  for (const prospect of prospects as any[]) {
    await sendReminder({
      id: prospect.id,
      name: prospect.properties['Name'].title[0].plain_text,
      phone: prospect.properties['Phone'].phone_number.replaceAll(' ', ''),
      reminderType: 'followup',
    });
  }
};

const sendOrderStatusMessage = async (
  orderId: string,
  imageUrl: string,
  reminderType: 'collected' | 'delivered',
  customer?: { name: string; phone: string },
) => {
  // Fast path: the dashboard already knows the customer, so the webhook can
  // fire directly without the two Notion queries (getOrderConstants +
  // getOrders) the lookup path requires.
  if (customer) {
    await sendReminder({
      id: orderId,
      name: customer.name,
      phone: customer.phone.replaceAll(' ', ''),
      imageUrl,
      reminderType,
    });
    return;
  }

  // Fallback for callers that don't have the customer handy.
  const orderConstants = await getOrderConstants();
  const orders = await getOrders({
    orderGroup: orderConstants.serviceOrderGroup.orderGroupNumber,
    includeUrgent: false,
  });

  const matchedOrder = ((orders ?? []) as any[]).find(
    (order) => order.properties['ID'].title[0].text.content === orderId,
  );

  if (!matchedOrder) {
    console.log(`Unable to find customer with order ID ${orderId}`);
    return;
  }

  await sendReminder({
    id: matchedOrder.id,
    name: matchedOrder.properties['Customer Name'].rollup.array[0].title[0]
      .plain_text,
    phone: matchedOrder.properties['Customer Phone'].rollup.array[0].phone_number.replaceAll(
      ' ',
      '',
    ),
    imageUrl,
    reminderType,
  });
};

export const sendCollectedMessage = async (
  orderId: string,
  imageUrl: string,
  customer?: { name: string; phone: string },
) => sendOrderStatusMessage(orderId, imageUrl, 'collected', customer);

export const sendDeliveredMessage = async (
  orderId: string,
  imageUrl: string,
  customer?: { name: string; phone: string },
) => sendOrderStatusMessage(orderId, imageUrl, 'delivered', customer);
