'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import GoogleLogo from '@/components/ui/googlelogo';
import CopyChangeWrapper from './abtest/CopyChangeWrapper';

const GoogleReviewButton = () => {
  const showGoogleReviewsVariant = CopyChangeWrapper({ feature: 'hero-section-google-reviews-button', children: null }) as boolean;

  return (
    <a href='https://g.co/kgs/aXcTBcs' target='_blank' rel='noreferrer' className='block w-full lg:w-auto'>
      <Button
        variant={'outline'}
        size={'xl'}
        className='text-lg font-black flex flex-col gap-0 w-full lg:w-auto'>
        <div className='flex items-center gap-1'>
          {showGoogleReviewsVariant && <GoogleLogo />}
          5.0
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='#FAB130'
                stroke='#FAB130'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-star'>
                <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
              </svg>
            ))}
          </div>
          {showGoogleReviewsVariant && (
            <span className='text-xs text-gray-500 font-medium'>
              (66)
            </span>
          )}
        </div>
        <p className='text-xs text-gray-500 font-medium underline'>No.1 Reviewed in SG</p>
      </Button>
    </a>
  );
};

export default GoogleReviewButton;
