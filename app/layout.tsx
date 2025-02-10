import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/logo.png';

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
        <div className='bg-primary text-primary-foreground py-4 md:py-6'>
          <div className='max-w-6xl flex justify-between items-center mx-auto px-6'>
            <Link href='/'>
              <Image src={Logo} alt='Knife Sharpening Singapore' width={250} height={180} priority />
            </Link>
            <div className='flex gap-6'>
              <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
                <Button
                  variant={'secondary'}
                  size={'lg'}
                  className='text-lg font-black text-primary hidden md:flex gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
                    width='44'
                    height='44'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='#FAB130'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                    <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
                  </svg>
                  (65) 8068 4206
                </Button>
              </a>
              <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='text-sm font-black text-primary flex md:hidden gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-brand-whatsapp h-5 w-5'
                    width='44'
                    height='44'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='#FAB130'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                    <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
                  </svg>
                  (65) 8068 4206
                </Button>
              </a>
            </div>
          </div>
        </div>
        {children}
        <footer>
          <div className='max-w-2xl mx-auto pb-16 px-6'>
            <Link href='/blog'>
              <p className='text-center text-sm text-gray-500 mb-1 italic'>Blog</p>
            </Link>
            <p className='text-center text-sm text-gray-500 mb-1 font-bold'>Knife Sharpening Singapore.</p>
            <p className='text-center text-sm text-gray-500 mb-1'>
              Professional knife sharpening, picked up & delivered.
            </p>
            <p className='text-center text-sm text-gray-500'>&copy; 2024. All rights reserved.</p>
          </div>
        </footer>
        <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
          <Button
            size={'lg'}
            variant={'destructive'}
            className='text-lg font-black hidden md:flex fixed bottom-6 right-6 z-99'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='#FFFFFF'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
              <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
            </svg>
            Chat with us!
          </Button>
        </a>
        <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
          <Button
            size={'sm'}
            variant={'destructive'}
            className='text-sm font-black flex md:hidden fixed bottom-4 right-4 z-99'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='#FFFFFF'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
              <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
            </svg>
            Chat with us!
          </Button>
        </a>
      </body>
      <GoogleTagManager gtmId='GTM-KH7TZBT6' />
    </html>
  );
}
