'use client';

import React from 'react';
import posthog from 'posthog-js';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { FAQ } from './faqSection';

/**
 * The interactive half of FaqSection. Fires `faq` only when a question opens —
 * not on close, and not on clicks inside an open answer — and carries the
 * question text, since slugs like `scissors-faq-2` don't say what was asked.
 */
export default function FaqAccordion({ faqs, homepage }: { faqs: FAQ[]; homepage: boolean }) {
  const handleChange = (value: string) => {
    const faq = faqs.find((f) => f.slug === value);
    if (!faq) return;
    posthog.capture('faq', { origin: faq.slug, question: faq.question });
  };

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={handleChange}
      className={cn(
        'w-full mt-6 text-base',
        homepage && 'divide-y divide-stone-200 border-y border-stone-200'
      )}
    >
      {faqs.map((f) => (
        <AccordionItem
          key={f.slug}
          value={f.slug}
          id={f.slug}
          className={cn(homepage && 'border-0')}
        >
          <AccordionTrigger
            className={cn(
              homepage &&
                'py-5 text-lg font-bold text-stone-900 hover:no-underline [&>svg]:hidden [&[data-state=open]>span]:rotate-45'
            )}
          >
            {f.question}
            {homepage && (
              <span className='shrink-0 text-amber-600 transition-transform duration-200'>
                +
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent className={cn(homepage && 'text-base text-stone-600')}>
            <div
              className={cn(
                'prose prose-sm max-w-none',
                homepage ? 'text-stone-600' : 'text-foreground'
              )}
            >
              {f.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
