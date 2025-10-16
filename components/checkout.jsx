'use client';

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchClientSecret } from '../app/actions/stripe.js';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function CheckoutComponent() {
  const searchParams = useSearchParams();
  const knives = searchParams.get('knives');
  const repairs = searchParams.get('repairs');

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => fetchClientSecret(knives, repairs),
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

export default function Checkout() {
  return (
    <Suspense>
      <CheckoutComponent />
    </Suspense>
  );
}
