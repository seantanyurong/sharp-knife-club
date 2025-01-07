import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Professional Knife Sharpening - Picked Up & Delivered',
  description:
    'Order professional knife sharpening today with our fast and convenient pick-up service. 24H turnaround. Join the professional chefs and home cooks who love our results and service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
    </html>
  );
}
