import FaqSection from '@/components/section/faqSection';
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knife Sharpening FAQ | Pickup, Pricing & Turnaround | Knife Sharpening SG',
  description:
    'Answers about our knife sharpening service in Singapore: how we sharpen, free islandwide pickup, 24-hour turnaround, pricing, serrated knives, chips and scissors.',
  alternates: { canonical: '/faq' },
};

const FaqPage = () => {
  return (
    <main>
      <div className='pb-8 font-medium bg-muted'>
        <FaqSection />
      </div>
    </main>
  );
};

export default FaqPage;
