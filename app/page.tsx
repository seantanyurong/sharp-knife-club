import * as React from 'react';
import PricingSection from '@/components/section/pricingSection';
import LogoSection from '@/components/section/logoSection';
import FeaturedSection from './blog/featured_section';
import InstructionSection from '@/components/section/instructionsSection';
import HeroSection from '@/components/section/heroSection';
import ContactSection from '@/components/section/contactSection';
import SingleReviewSection from '@/components/section/singleReviewSection';
import FaqSection from '@/components/section/faqSection';

export default function Home() {
  return (
    <main>
      <div className='pb-8 font-medium bg-muted'>
        <HeroSection />
        <InstructionSection />
        <PricingSection />
        <LogoSection />
        <ContactSection />
        <SingleReviewSection />
        <FaqSection />
        <FeaturedSection homepage />
      </div>
    </main >
  );
}
