'use client'

import React from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { Badge } from './ui/badge'
import { NEXT_PICKUP_DATE } from '@/constants/dates'

function CollectionDateFeatureFlag({ type }: { type: string }) {
  const variant = useFeatureFlagVariantKey('collection-date-removal') || 'control';

  // if (variant === "no-collection-date") {
  //   return null;
  // } else {
  if (type === "badge") return (
    <Badge className='mt-4'>Next Collection: {NEXT_PICKUP_DATE}</Badge>
  )

  if (type === "main") return (
    <p className='text-sm'>Next Collection: {NEXT_PICKUP_DATE}</p>
  )
  // }

  return null;
}

export default CollectionDateFeatureFlag
