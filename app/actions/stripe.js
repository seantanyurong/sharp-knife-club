'use server';

import { headers } from 'next/headers';

import { stripe } from '../../lib/stripe';

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

function getRepairPriceIdFromRepairQuantity(repairs) {
  return 'price_1RoeFWGUii3OcuGTaHdLbs5D';
}

function generateLineItems(knives, repairs) {
  const line_items = [];

  const knifePriceId = getKnifePriceIdFromKnifeQuantity(knives);
  const repairPriceId = getRepairPriceIdFromRepairQuantity(repairs);

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

  // Free Delivery
  line_items.push({
    price: 'price_1SIksgGUii3OcuGT8iFhQHPE',
    quantity: 1,
  });

  return line_items;
}

export async function fetchClientSecret(knives, repairs) {
  const origin = (await headers()).get('origin');

  const line_items = generateLineItems(knives, repairs);

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['SG'],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items: line_items,
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
    },
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}
