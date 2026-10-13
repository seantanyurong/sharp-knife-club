'use client';

import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Tells Tag Manager a payment went through, for the Google Ads purchase
 * conversion. Rendered by /return only once Stripe reports the session
 * complete.
 *
 * Pushes the GA4-style `purchase` event: a GTM Custom Event trigger on
 * `purchase` fires the Google Ads conversion tag, reading `ecommerce.value`,
 * `ecommerce.currency` and `ecommerce.transaction_id` from the data layer.
 * The transaction id is the Stripe session id, which Google Ads uses to drop
 * duplicates; the sessionStorage guard also stops a refresh re-sending it.
 *
 * `user_data` (email, E.164 phone from Stripe) is for enhanced conversions:
 * most customers pay from the link we send on WhatsApp, which opens in a
 * different browser from the one that clicked the ad, so there's no gclid
 * cookie here. The Google Ads tag hashes these before sending; the GTM tag
 * reads them through a User-Provided Data variable.
 */
export default function PurchaseEvent({
  transactionId,
  value,
  currency,
  email,
  phone,
}: {
  transactionId: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
}) {
  useEffect(() => {
    const key = `purchase_sent_${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage blocked: send anyway and rely on Google Ads' dedupe.
    }

    // Clear any previous ecommerce object so fields don't carry over.
    sendGTMEvent({ ecommerce: null, user_data: null });
    sendGTMEvent({
      event: 'purchase',
      ecommerce: { transaction_id: transactionId, value, currency },
      user_data: {
        ...(email ? { email } : {}),
        ...(phone ? { phone_number: phone } : {}),
      },
    });
  }, [transactionId, value, currency, email, phone]);

  return null;
}
