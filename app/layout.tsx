import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Chat from '@/components/ui/chat';
import { PostHogProvider } from './providers';
import PostHogReady from '@/components/ui/posthogloadcheck';
import ClientProvider from './clientProvider';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Professional Knife Sharpening - Free Pickup Islandwide',
  description:
    'Get your knives picked up and sharpened by the No.1 sharpening service in Singapore. Join the professional chefs and home cooks who love our results and service.',
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
          <ClientProvider>
            <Header />
            <PostHogReady />
            {children}
            <Footer />
            <Chat />
          </ClientProvider>
        </PostHogProvider>
      </body>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
    </html>
  );
}
