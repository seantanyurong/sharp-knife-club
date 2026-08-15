import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  stringifyAddressObject,
  getNewOrderNumber,
  formatDate,
} from '@/lib/server/orderUtils';
import {
  insertNotionCustomer,
  insertNotionOrder,
  getOrderConstants,
  getOrderCountForGroup,
  getNotionCustomerIdByPhone,
  updateNotionCustomerAddress,
  updateNotionCustomerName,
  updateNotionProspectToCustomer,
  updateNotionCustomer180DayFollowUp,
  clearNotionCustomerReminderDate,
} from '@/lib/server/notion';
import { fetchBotspace } from '@/lib/server/botspace';
import {
  createNewOrderNotificationMessage,
  sendMessageToTelegramNotifications,
} from '@/lib/server/telegram';

const endpointSecret = process.env.STRIPE_SIGNING_KEY;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'NA');
const BOTSPACE_NEW_ORDER_WEBHOOK_URL =
  'https://hook.bot.space/ZHVAL4hD99ef/v1/webhook/automation/68da50444ce0c3f496978e79/flow/68e4cbdbbf1d5ae408c5657d';

async function getOrCreateStripeCustomer({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}): Promise<string | null> {
  const existing = await stripe.customers.search({
    query: `phone:'${phone}'`,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  const customer = await stripe.customers.create({ name, email, phone });
  return customer.id;
}

export async function POST(request: Request) {
  if (!endpointSecret) {
    console.error('STRIPE_SIGNING_KEY is not set');
    return new NextResponse(null, { status: 400 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new NextResponse(null, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Stripe needs the raw body to verify the signature.
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed.', err);
    return new NextResponse(null, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  try {
    const eventData = event.data.object;
    const customerData = eventData.customer_details;

    if (
      !customerData ||
      !customerData.phone ||
      !customerData.name ||
      !customerData.address ||
      !eventData.amount_total
    ) {
      return new NextResponse(null, { status: 400 });
    }

    const customerPhone = customerData.phone.replaceAll(' ', '');
    const customerName = customerData.name;

    const customerAddress = stringifyAddressObject({
      line1: customerData.address.line1 || '',
      line2: customerData.address.line2 || '',
      postal_code: customerData.address.postal_code || '',
    });

    const additionalInstructions =
      eventData.custom_fields.find(
        (field) => field.key === 'additional_instructions',
      )?.text?.value || 'NA';
    const sharpeningNote = 'NA';

    const orderData = eventData.metadata;
    const orderKnives = orderData?.knives || '0';
    const orderRepairs = orderData?.repairs || '0';
    const orderCustom = orderData?.custom || '0';
    const orderGroup = orderData?.orderGroup || '0';
    const orderTotal = eventData.amount_total / 100;

    const orderConstants = await getOrderConstants();
    const bookingGroup =
      orderConstants.bookingOrderGroupArray.find(
        (group) => group.orderGroupNumber === Number(orderGroup),
      ) || orderConstants.bookingOrderGroup;
    const currentOrderCount = await getOrderCountForGroup(
      bookingGroup.orderGroupNumber,
    );

    // Custom orders are handled manually — don't create an order record.
    if (Number(orderCustom) > 0) {
      return NextResponse.json({ received: true });
    }

    const customerBody = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
    };

    let customerId = await getNotionCustomerIdByPhone(customerPhone);

    if (customerId) {
      await updateNotionProspectToCustomer(customerId);
      await updateNotionCustomerAddress(customerId, customerBody.address);
      await updateNotionCustomerName(customerId, customerBody.name);
      await updateNotionCustomer180DayFollowUp(customerId, false);
      await clearNotionCustomerReminderDate(customerId);
    } else {
      const customer = await insertNotionCustomer(customerBody);
      if (!customer) {
        return new NextResponse(null, { status: 400 });
      }
      customerId = customer.id;
    }

    // Awaited — the Express version ran this in a floating IIFE, which a
    // serverless runtime may kill before it completes.
    const paymentIntentId = eventData.payment_intent as string | null;
    try {
      const stripeCustomerId = await getOrCreateStripeCustomer({
        name: customerName,
        email: customerData.email ?? '',
        phone: customerPhone,
      });

      if (stripeCustomerId && paymentIntentId) {
        await stripe.paymentIntents.update(paymentIntentId, {
          customer: stripeCustomerId,
        });
      }
    } catch (err) {
      console.error('Stripe customer association failed:', err);
    }

    await insertNotionOrder({
      knives: parseInt(orderKnives),
      repairs: parseInt(orderRepairs),
      orderTotal,
      note: additionalInstructions,
      sharpeningNote,
      customerId,
      orderGroup: bookingGroup.orderGroupNumber,
      currentOrder: currentOrderCount,
      pickupDate: bookingGroup.pickupDate,
      deliveryDate: bookingGroup.deliveryDate,
    });

    const botspaceBody = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      note: additionalInstructions,
      orderNumber: getNewOrderNumber(
        bookingGroup.orderGroupNumber,
        currentOrderCount,
      ),
      pickupDate: formatDate(bookingGroup.pickupDate),
      deliveryDate: formatDate(bookingGroup.deliveryDate),
      timing: bookingGroup.timing,
      knives: parseInt(orderKnives),
      repairs: parseInt(orderRepairs),
      orderTotal,
    };

    await fetchBotspace(BOTSPACE_NEW_ORDER_WEBHOOK_URL, botspaceBody);
    await sendMessageToTelegramNotifications(
      createNewOrderNotificationMessage(botspaceBody),
    );

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Failed to process checkout.session.completed', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
