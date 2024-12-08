import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Knife Sharpening - Professional Pick-up Service',
  description:
    'Order professional knife sharpening today with our fast and convenient pick-up service. Join the professional chefs and home cooks who love our results and service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
      <body className={inter.className}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KH7TZBT6'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
