'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className='col-span-1'>
      {!videoLoaded && (
        <Image src='/hero-placeholder.png' alt='Video Placeholder' width={400} height={400} loading='eager' />
      )}
      <video
        width={400}
        height={400}
        autoPlay
        loop
        muted
        playsInline
        className='rounded-2xl'
        onLoadedData={() => setVideoLoaded(true)}
        style={{ display: videoLoaded ? 'block' : 'none' }}>
        <source src={'/images/new-hero.mp4'} type='video/mp4' />
      </video>
    </div>
  );
}
