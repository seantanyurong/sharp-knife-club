import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/logo.png';
import { Button } from './button';

import WhatsAppLink from '@/components/ui/whatsapp';

function Header() {
  return (
    <div className='bg-primary text-primary-foreground py-4 md:py-6'>
    <div className='max-w-6xl flex justify-between items-center mx-auto px-6'>
      <Link href='/'>
        <Image src={Logo} alt='Knife Sharpening Singapore' width={250} height={180} priority />
      </Link>
      <div className='flex gap-6'>
        <WhatsAppLink origin="header">
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
        </WhatsAppLink>
        <WhatsAppLink origin="header">
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
        </WhatsAppLink>
      </div>
    </div>
  </div>  )
}

export default Header