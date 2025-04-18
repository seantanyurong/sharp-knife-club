import React from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

const variants = {
  'copy-change-hero-section-title': {
    control: 'Professional Knife Sharpening, Picked Up & Delivered',
    variant_a: 'Professional Knife Sharpening, Picked Up & Delivered Within One Day',
    variant_b: 'Knife Sharpening in 24 Hours – Pickup & Delivery Included'
  },
};

function CopyChangeWrapper({ feature, children } : { feature: string; children: React.ReactNode; }) {
  if (!feature || !(feature in variants)) {
    return <>{children}</>;
  }

  const variantKey = typeof useFeatureFlagVariantKey(feature) === 'string' ? useFeatureFlagVariantKey(feature) : 'control';
  const featureVariants = variants[feature as keyof typeof variants];
  const copy = featureVariants[variantKey as keyof typeof featureVariants];

  return (
    <>{copy}</>
  );
}

export default CopyChangeWrapper