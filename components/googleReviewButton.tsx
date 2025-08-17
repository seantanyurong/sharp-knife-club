'use client';

import { Star } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import GoogleLogo from '@/components/ui/googlelogo';

const GoogleReviewButton = () => {
  return (
    <a href='https://g.co/kgs/aXcTBcs' target='_blank' rel='noreferrer' className='block w-full lg:w-auto'>
      <Button
        variant={'outline'}
        size={'2xl'}
        className='text-xl font-black flex flex-col gap-0 w-full lg:w-auto'>
        <div className='flex items-center gap-1'>
          <GoogleLogo />
          <span className='ml-1'>5.0
          </span>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <Star key={index} className='w-12 h-12 text-secondary fill-secondary' />
            ))}
          </div>
          <span className='text-xs text-gray-500 font-medium'>
            (103)
          </span>
        </div>
        <p className='text-sm text-gray-500 font-medium underline'>No.1 Google Reviews in SG</p>
      </Button>
    </a>
  );
};

export default GoogleReviewButton;
