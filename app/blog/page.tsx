import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import Logo from '../../public/logo.png'
import ArticleCards from './article_cards'


function page() {
    return (
        <>
          <div className='bg-primary text-primary-foreground py-4 md:py-6 px-6'>
            <div className='max-w-6xl flex justify-between items-center mx-auto'>
              <Image src={Logo} alt='Knife Sharpening Singapore' width={180} height={180} priority />
              <div className='flex gap-6'>
                <a href='https://wa.me/message/LQDK2KE5I3PNF1' className='items-center gap-1 hidden md:flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-brand-whatsapp text-primary-foreground h-8 w-8'
                    width='44'
                    height='44'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#f8fafc'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                    <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
                  </svg>
                  <p className='text-lg font-semibold'>(65) 8068 4206</p>
                </a>
                <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
                  <Button variant={'secondary'} size={'lg'} className='text-lg font-semibold hidden md:block'>
                    Sharpen Knife
                  </Button>
                </a>
                <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
                  <Button variant={'secondary'} size={'sm'} className='text-sm font-semibold block md:hidden'>
                    Sharpen Knife
                  </Button>
                </a>
              </div>
            </div>
          </div>
    
          <div className='max-w-3xl mx-auto p-6'>
            <h1 className='text-3xl mt-6 font-semibold text-center'>Blog</h1>

            <section className='relative'>
              <div className='py-8 md:py-12'>
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12'>{<ArticleCards />}</div>
                </div>
              </div>
            </section>
          </div>

        </>
  )
}

export default page