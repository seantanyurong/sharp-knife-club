import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Chat from '@/components/ui/chat';
import { PostHogProvider } from './providers';
import PostHogReady from '@/components/ui/posthogloadcheck';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Professional Knife Sharpening - Picked Up & Delivered',
  description:
    'Get your knives sharpened today with our fast and convenient pick-up service. 24H turnaround. Join the professional chefs and home cooks who love our results and service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={openSans.className}>
        <PostHogProvider>
          <Header />
          <PostHogReady />
          {children}
          <Footer />
          <Chat />
        </PostHogProvider>
      </body>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
    </html>
  );
}
