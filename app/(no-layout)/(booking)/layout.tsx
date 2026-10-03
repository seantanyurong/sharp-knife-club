import React from 'react';
import { PostHogProvider } from '@/app/(main)/providers';

// The booking flow lives under the bare (no-layout) root layout so it renders
// without the site header and footer — but it still needs analytics, or the
// funnel goes dark between the quote and the payment. Admin pages share that
// root layout and deliberately stay untracked.
export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
