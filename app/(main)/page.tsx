import * as React from 'react';
import PricingSection from '@/components/section/pricingSection';
import FeaturedSection from './blog/featured_section';
import LogoSection from '@/components/section/logoSection';
import InstructionSection from '@/components/section/instructionsSection';
import HeroSection from '@/components/section/heroSection';
import SingleReviewSection from '@/components/section/singleReviewSection';
import ReviewWallSection from '@/components/section/reviewWallSection';
import GuaranteeSection from '@/components/section/guaranteeSection';
import ClosingCtaSection from '@/components/section/closingCtaSection';
import FaqSection from '@/components/section/faqSection';
import ResultSection from '@/components/section/resultSection';

export default function Home() {
  return (
    <main>
      <div className='font-medium bg-muted'>
        <HeroSection />
        <ResultSection />
        <InstructionSection />
        <PricingSection />
        <LogoSection />
        <ReviewWallSection />
        <SingleReviewSection />
        <GuaranteeSection />
        <FeaturedSection homepage />
        <FaqSection homepage />
        <ClosingCtaSection />
      </div>
    </main >
  );
}
