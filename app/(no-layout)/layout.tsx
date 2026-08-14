import '../globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
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
