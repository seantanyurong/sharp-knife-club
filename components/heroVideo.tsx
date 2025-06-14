'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import CopyChangeWrapper from './abtest/CopyChangeWrapper';

export default function HeroVideo() {
  const video_src = CopyChangeWrapper({feature: 'hero-section-video', children: null}) as string;

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
        <video key={video_src} width={400} height={400} autoPlay loop muted playsInline className='rounded-2xl'>
          <source src={`/images/${video_src}.mp4`} type='video/mp4' />
        </video>
      </Suspense>
    </div>
  );
}
