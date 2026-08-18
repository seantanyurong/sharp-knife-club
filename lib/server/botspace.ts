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

const BOTSPACE_REMINDER_WEBHOOK_URL =
  'https://hook.bot.space/ZHVAL4hD99ef/v1/webhook/automation/68da50444ce0c3f496978e79/flow/68eff0c8bf1d5ae40860a005';

export const fetchBotspace = async (url: string, body: unknown) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

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
    await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, {
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
      reminderType: 'oneeighty',
    };
    await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, customerBody);
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
      reminderType: 'request',
    };
    await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, customerBody);
    await clearNotionCustomerReminderDate(customerBody.id);
  }
};

export const sendProspectReminder = async () => {
  const prospects = await getProspectsCreatedThisWeek();

  for (const prospect of prospects as any[]) {
    await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, {
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
    await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, {
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

  await fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, {
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
