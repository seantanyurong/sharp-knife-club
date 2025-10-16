'use server';

import { headers } from 'next/headers';

import { stripe } from '../../lib/stripe';

export async function fetchClientSecret(knives, repairs) {
  const origin = (await headers()).get('origin');

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['SG'],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        price: 'price_1SGZZ0GaVAbUPxo7NVHaCdex',
        quantity: knives,
      },
      {
        price: 'price_1SIkIaGaVAbUPxo7O41lFZVp',
        quantity: repairs,
      },
    ],
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
