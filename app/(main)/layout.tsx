import React from 'react';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import '../globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import MetaPixel from "@/components/scripts/MetaPixel";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Chat from '@/components/ui/chat';
import { PostHogProvider } from './providers';
import PostHogReady from '@/components/ui/posthogloadcheck';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Knife Sharpening Singapore - Free Pickup Islandwide',
  description:
    'Free pickup & delivery islandwide. Professional knife sharpening for kitchen knives, chef knives, scissors & serrated blades. Book online today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={openSans.className}>
        <MetaPixel />
        <PostHogProvider>
          <Header />
          <PostHogReady />
          {children}
          <Footer />
          <Chat />
        </PostHogProvider>
      </body>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
