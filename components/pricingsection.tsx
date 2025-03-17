'use client'

import Image from 'next/image'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import posthog from 'posthog-js'
import { useEffect, useRef } from 'react'

function PricingSection({ control=true }: { control: boolean; }) {
  const variant = useFeatureFlagVariantKey('pricing-positioning-conversion') || "control";
  console.log(variant)

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) {
          posthog.capture('PricingSection Viewed', { variant });
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant, control]);

  if ((variant === 'position-top' && !control) || (variant !== 'position-top' && control)) {
    return (
      <div ref={sectionRef} className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-8 px-6 mt-16'>
        <div className='col-span-1'>
          <Image src={'/images/price.png'} alt='Price' width={500} height={500} className='rounded-2xl' />
        </div>
        <div className='col-span-2 mt-8 lg:mt-0'>
          <h1 className='text-primary text-3xl md:text-4xl font-black'>Pricing</h1>
          <div className='mt-4 flex gap-4 flex-col'>
            <div className='bg-muted rounded-2xl p-4'>
              <h1 className='text-lg md:text-2xl font-black'>1 Blade — $30 / knife</h1>
            </div>
            <div className='bg-muted rounded-2xl p-4'>
              <h1 className='text-lg md:text-2xl font-black'>2 Blades — $20 / knife</h1>
            </div>
            <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
              <div className='bg-primary rounded-2xl p-4 relative'>
                <h1 className='text-lg md:text-2xl text-white font-black'>3+ Blades — $15 / knife</h1>
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
          <p className='mt-4 italic'>Additional costs apply for major repairs, de-rusting and serrated knives.</p>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default PricingSection