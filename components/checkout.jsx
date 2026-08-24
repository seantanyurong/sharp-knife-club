'use client';

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchClientSecret } from '../app/actions/stripe.js';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PhoneInput } from './ui/phoneInput';
import { toE164 } from '@/lib/phone';
import { CHECKOUT_PHONE_KEY } from '@/constants/checkout';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

// Normally the number arrives from step 4 of /order. This is the fallback for
// anyone landing on /checkout directly -- Stripe can only attach a payment to a
// customer handed over at session creation, so we can't proceed without one.
function PhoneGate({ onSubmit }) {
  const [country, setCountry] = useState('SG');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = toE164(phone, country);
    if (!normalized) {
      setError('Enter a valid mobile number for the country you selected.');
      return;
    }

    onSubmit(normalized);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-lg"
    >
      <h1 className="text-xl font-black text-primary">
        What&apos;s your mobile number?
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We use it to match this order to your pickup and delivery — and to pull
        up your details if you&apos;ve ordered before.
      </p>
      <PhoneInput
        country={country}
        onCountryChange={(event) => {
          setCountry(event.target.value);
          setError('');
        }}
        value={phone}
        onNumberChange={(event) => {
          setPhone(event.target.value);
          setError('');
        }}
        invalid={Boolean(error)}
        placeholder="9123 4567"
        aria-label="Mobile number"
        className="mt-4"
      />
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      ) : null}
      <Button
        type="submit"
        size="xl"
        className="mt-4 w-full text-base font-black uppercase tracking-widest"
      >
        Continue to payment
      </Button>
    </form>
  );
}

function CheckoutComponent() {
  const searchParams = useSearchParams();
  const knives = searchParams.get('knives');
  const repairs = searchParams.get('repairs');
  const urgent = searchParams.get('urgent');
  const custom = searchParams.get('custom');
  const orderGroup = searchParams.get('orderGroup');

  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(CHECKOUT_PHONE_KEY);
    if (stored) {
      setPhone(stored);
    }
  }, []);

  const getClientSecret = useCallback(
    () => fetchClientSecret(knives, repairs, urgent, custom, orderGroup, phone),
    [knives, repairs, urgent, custom, orderGroup, phone],
  );

  if (!phone) {
    return <PhoneGate onSubmit={setPhone} />;
  }

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret: getClientSecret }}
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
