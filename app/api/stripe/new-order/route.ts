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

    // Stripe rejects a later `customer` update on a PaymentIntent that Checkout
    // created ("cannot be used when modifying a PaymentIntent that was created
    // by Checkout"), so the customer has to come from the session itself — see
    // where app/actions/stripe.js passes `customer`. Awaited because the
    // Express version ran this in a floating IIFE, which a serverless runtime
    // may kill before it completes.
    const paymentIntentId = eventData.payment_intent as string | null;
    const stripeCustomerId =
      typeof eventData.customer === 'string'
        ? eventData.customer
        : (eventData.customer?.id ?? null);
    try {
      if (!stripeCustomerId) {
        throw new Error(
          'Checkout session completed without a customer — is customer_creation still if_required?',
        );
      }

      // Checkout writes back name, address and shipping itself (customer_update
      // in app/actions/stripe.js), but it has no equivalent for email or phone,
      // and a customer created by the phone gate starts with only a phone. Fill
      // those in here, along with the Notion id that ties the records together.
      await stripe.customers.update(stripeCustomerId, {
        name: customerName,
        phone: customerPhone,
        metadata: { notion_customer_id: customerId },
        ...(customerData.email ? { email: customerData.email } : {}),
      });
    } catch (err) {
      // The order still goes through — but log the Stripe status and code, not
      // just the error object: a bare console.error is what let the previous
      // 403 run unnoticed.
      const stripeErr = err as Stripe.StripeRawError;
      console.error('Stripe customer association failed:', {
        statusCode: stripeErr?.statusCode,
        code: stripeErr?.code,
        message: stripeErr?.message,
        paymentIntentId,
        customerPhone,
      });
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
