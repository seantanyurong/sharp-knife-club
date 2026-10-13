import React from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { PostHogProvider } from '@/app/(main)/providers';

// The booking flow lives under the bare (no-layout) root layout so it renders
// without the site header and footer — but it still needs analytics, or the
// funnel goes dark between the quote and the payment. Admin pages share that
// root layout and deliberately stay untracked.
//
// Tag Manager is the same container as the main site, so Google Ads can see
// the purchase on /return (components/scripts/PurchaseEvent.tsx).
export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PostHogProvider>{children}</PostHogProvider>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
    </>
  );
}
