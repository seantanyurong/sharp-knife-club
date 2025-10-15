'use server';

import { headers } from 'next/headers';

import { stripe } from '../../lib/stripe';

export async function fetchClientSecret() {
  const origin = (await headers()).get('origin');

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['SG'],
    },
    line_items: [
      {
        price: 'price_1SGZZ0GaVAbUPxo7NVHaCdex',
        quantity: 3,
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
      knives: 3,
      repairs: 0,
    },
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}
