'use server';

import { headers } from 'next/headers';

import { stripe } from '../../lib/stripe';

function getKnifePriceIdFromKnifeQuantity(knives) {
  switch (knives) {
    case 4:
      return 'price_1SGZZ0GaVAbUPxo7NVHaCdex';
    case 5:
      return 'price_1SIkIaGaVAbUPxo7O41lFZVp';
    case 7:
      return 'price_1SJ1a0GaVAbUPxo7O41lFZVp';
    case 10:
      return 'price_1SJ5a0GaVAbUPxo7O41lFZVp';
    case 14:
      return 'price_1SJ9a0GaVAbUPxo7O41lFZVp';
    default:
      return 'price_1SGZZ0GaVAbUPxo7NVHaCdex';
  }
}

function getRepairPriceIdFromRepairQuantity(repairs) {
  return 'price_1SIkIaGaVAbUPxo7O41lFZVp';
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
