'use client'

import Image from 'next/image'
import CopyChangeWrapper from '../abtest/CopyChangeWrapper'

function PricingSection() {
  const img_src = CopyChangeWrapper({ feature: 'pricing-section-image', children: null }) as string;

  return (
    <div className='bg-primary px-6 py-16'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-8 '>
        <div className='col-span-1'>
          <Image key={img_src} src={`/images/${img_src}.png`} alt='Price' width={500} height={500} className='rounded-2xl' />
        </div>
        <div className='col-span-2 mt-8 lg:mt-0'>
          <h1 className='text-primary-foreground text-3xl md:text-4xl font-black'>PRICING</h1>
          <div className='mt-4 flex gap-4 flex-col'>
            <div className='bg-muted rounded-2xl p-4'>
              <h1 className='text-lg md:text-2xl font-black'>1 BLADE - $35 PER KNIFE</h1>
            </div>
            <div className='bg-muted rounded-2xl p-4'>
              <h1 className='text-lg md:text-2xl font-black'>2 BLADES - $20 PER KNIFE</h1>
            </div>
            <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
              <div className='bg-secondary rounded-2xl p-4 relative'>
                <h1 className='text-lg md:text-2xl text-white font-black'>3+ BLADES — $15 PER KNIFE</h1>
                <Image
                  src={'/images/best-deal.png'}
                  alt='Price'
                  width={80}
                  height={80}
                  className='absolute -top-8 -right-6 z-99'
                />
              </div>
            </a>
          </div>
          <p className='mt-4 italic text-primary-foreground'>Free pickup and delivery. Free repair of small chips. Additional costs for larger repairs.</p>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
