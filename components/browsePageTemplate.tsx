import HeroSection from '@/components/section/heroSection';
import BrowseIntroSection from '@/components/section/browseIntroSection';
import InstructionSection from '@/components/section/instructionsSection';
import PricingSection from '@/components/section/pricingSection';
import LogoSection from '@/components/section/logoSection';
import ContactSection from '@/components/section/contactSection';
import ResultSection from '@/components/section/resultSection';
import SingleReviewSection from '@/components/section/singleReviewSection';
import FaqSection, { type FAQ } from '@/components/section/faqSection';
import type { BrowsePageConfig } from '@/constants/browse-pages';

export default function BrowsePageTemplate({ page, slug }: { page: BrowsePageConfig; slug: string }) {
  const faqs: FAQ[] = page.intro.faqs.map((f, i) => ({
    slug: `${slug}-faq-${i}`,
    question: f.question,
    answer: <p>{f.answer}</p>,
    plainTextAnswer: f.answer,
  }));

  return (
    <main>
      <div className='pb-8 font-medium bg-muted'>
        <HeroSection headline={page.headline} />
        <BrowseIntroSection {...page.intro} />
        <InstructionSection stepDescriptions={page.overrides?.instructions?.stepDescriptions} />
        <PricingSection note={page.overrides?.pricing?.note} />
        <LogoSection />
        <ContactSection />
        <ResultSection />
        <SingleReviewSection />
        <FaqSection faqs={faqs} />
      </div>
    </main>
  );
}
