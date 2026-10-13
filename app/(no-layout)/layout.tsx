import '../globals.css';
import type { Metadata } from 'next';
import { SITE_URL } from '@/constants/site';
import { Open_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

// Everything under this layout is a step in booking, sign-in or admin, not a
// page anyone should land on from search. Google was showing /order, /checkout
// and /auth/sign-in for "knife sharpening singapore", competing with the home
// page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: false, follow: true },
  title: 'Professional Knife Sharpening - Free Pickup Islandwide',
  description:
    'We offer professional knife sharpening services in Singapore for kitchen knives, chef knives, scissors, serrated blades, and more. Free pickup and delivery islandwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
