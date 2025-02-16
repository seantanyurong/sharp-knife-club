'use client';

import { Suspense } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  return (
    <div className='col-span-1'>
      <Suspense
        fallback={
          <Image
            src='/images/hero-placeholder.png'
            alt='Video Placeholder'
            width={400}
            height={400}
            loading='eager'
            className='rounded-2xl'
          />
        }>
        <video width={400} height={400} autoPlay loop muted playsInline className='rounded-2xl'>
          <source src={'/images/new-hero.mp4'} type='video/mp4' />
        </video>
      </Suspense>
    </div>
  );
}
