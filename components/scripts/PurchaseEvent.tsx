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
 */
export default function PurchaseEvent({
  transactionId,
  value,
  currency,
}: {
  transactionId: string;
  value: number;
  currency: string;
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
    sendGTMEvent({ ecommerce: null });
    sendGTMEvent({
      event: 'purchase',
      ecommerce: { transaction_id: transactionId, value, currency },
    });
  }, [transactionId, value, currency]);

  return null;
}
