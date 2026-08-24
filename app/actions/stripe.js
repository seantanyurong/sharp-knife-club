'use server';

import { headers } from 'next/headers';

import { stripe } from '../../lib/stripe';
import { isValidE164 } from '../../lib/phone';

function getKnifePriceIdFromKnifeQuantity(knives) {
  switch (Number(knives)) {
    case 3:
      return 'price_1RdNENGUii3OcuGTovsjRdjd';
    case 4:
      return 'price_1SLHbmGUii3OcuGTOs39v1i6';
    default:
      return 'price_1RQ0nJGUii3OcuGTVmHk4nxc';
  }
}

function getRepairPriceIdFromRepairQuantity() {
  return 'price_1RoeFWGUii3OcuGTaHdLbs5D';
}

function getUrgentPriceId() {
  return 'price_1RdNF9GUii3OcuGTNd5pCMqw';
}

function generateLineItems(knives, repairs, urgent) {
  const line_items = [];

  const knifePriceId = getKnifePriceIdFromKnifeQuantity(knives);
  const repairPriceId = getRepairPriceIdFromRepairQuantity();
  const urgentPriceId = getUrgentPriceId();

  if (knives > 0) {
    line_items.push({
      price: knifePriceId,
      quantity: knives,
    });
  }

  if (repairs > 0) {
    line_items.push({
      price: repairPriceId,
      quantity: repairs,
    });
  }

  if (urgent > 0) {
    line_items.push({
      price: urgentPriceId,
      quantity: 1,
    });
  } else {
    // Free Delivery
    line_items.push({
      price: 'price_1SIksgGUii3OcuGT8iFhQHPE',
      quantity: 1,
    });
  }

  return line_items;
}

// Stripe has no `customer_phone` prefill param -- a phone only shows up in
// Checkout if it's already on a Customer we hand over. So the customer is
// created here rather than at confirmation time, which also means the payment
// always lands on a real customer (a Checkout-created PaymentIntent refuses a
// `customer` update afterwards).
//
// The cost is a record for every abandoned checkout. They're tagged so they can
// be told apart from customers who actually ordered -- the webhook stamps
// notion_customer_id on the ones that complete -- and the next attempt from the
// same number reuses the record rather than adding another.
async function getOrCreateCustomerId(phone) {
  try {
    const existing = await stripe.customers.search({
      query: `phone:'${phone}'`,
      limit: 1,
    });

    if (existing.data.length > 0) {
      return existing.data[0].id;
    }

    const created = await stripe.customers.create({
      phone,
      metadata: { created_via: 'checkout_phone_gate' },
    });
    return created.id;
  } catch (err) {
    // Reusing a customer is a nice-to-have; never let it block a payment.
    console.error('Stripe customer lookup failed, falling back to a guest checkout:', err);
    return null;
  }
}

export async function fetchClientSecret(
  knives,
  repairs,
  urgent,
  custom,
  orderGroup,
  phone,
) {
  const origin = (await headers()).get('origin');

  if (!isValidE164(phone ?? '')) {
    throw new Error('A valid mobile number is required to check out.');
  }

  const line_items = generateLineItems(knives, repairs, urgent);

  const customerId = await getOrCreateCustomerId(phone);
  const customerParams = customerId
    ? {
        customer: customerId,
        // Required when reusing a customer while collecting addresses, and it
        // keeps the stored record in step with what they type in Checkout.
        customer_update: { name: 'auto', address: 'auto', shipping: 'auto' },
      }
    : { customer_creation: 'always' };

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    ...customerParams,
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['SG'],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items: line_items,
    allow_promotion_codes: true, // This enables the coupon input field
    custom_fields: [
      {
        key: 'additional_instructions',
        label: {
          custom: 'Additional Instructions',
          type: 'custom',
        },
        type: 'text',
        optional: true,
      },
    ],
    metadata: {
      knives: knives,
      repairs: repairs,
      custom: custom,
      orderGroup: orderGroup,
    },
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}
