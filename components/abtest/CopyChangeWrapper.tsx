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
};

function CopyChangeWrapper({ feature, children } : { feature: string; children: React.ReactNode; }) {
  const posthogVariantKey = useFeatureFlagVariantKey(feature);

  if (!feature || !(feature in variants)) {
    return <>{children}</>;
  }

  const variantKey = typeof posthogVariantKey === 'string' ? posthogVariantKey : 'control';
  const featureVariants = variants[feature as keyof typeof variants];
  const copy = featureVariants[variantKey as keyof typeof featureVariants];

  return (
    <>{copy}</>
  );
}

export default CopyChangeWrapper