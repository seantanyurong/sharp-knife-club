'use client'

import React from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

const variants = {
  'copy-change-hero-section-title': {
    control: 'Professional Knife Sharpening, Picked Up & Delivered',
    variant_a: 'Professional Knife Sharpening, Picked Up & Delivered Within One Day',
    variant_b: 'Knife Sharpening in One Day – Pickup & Delivery Included'
  },
  'copy-change-hero-section-cta-button': {
    control: 'Sharpen Your Knives Now',
    variant_a: 'Book Knife Pickup',
    variant_b: 'WhatsApp Us to Sharpen',
  },
  'copy-change-process-section-header': {
    control: 'A Simple 3-Step Process',
    variant_a: 'Free Pickup Islandwide | Delivered Within One Day',
  },
  'hero-section-video': {
    control: 'new-hero',
    variant_a: 'new-hero-variant-a',
  },
  'hero-section-google-reviews-button': {
    control: false,
    variant_a: true,
  },
  'pricing-section-image': {
    control: 'price',
    variant_a: 'price-variant-a',
  },
  'logo-section-position': {
    control: 'no_section',
    variant_a: 'hero_section',
    variant_b: 'pricing_section',
  },
  'sharpened-results-section': {
    control: false,
    variant_a: true,
  },
};

function CopyChangeWrapper({ feature, children } : { feature: string; children: React.ReactNode; }) {
  const posthogVariantKey = useFeatureFlagVariantKey(feature);

  if (!feature || !(feature in variants)) {
    return <>{children}</>;
  }

  const variantKey = typeof posthogVariantKey === 'string' ? posthogVariantKey : 'control';
  const featureVariants = variants[feature as keyof typeof variants];
  const copy = featureVariants[variantKey as keyof typeof featureVariants];


  if (!children) {
    return copy;
  }

  return (
    <>{copy}</>
  );
}

export default CopyChangeWrapper