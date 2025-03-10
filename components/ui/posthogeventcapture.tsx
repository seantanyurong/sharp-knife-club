'use client'

import { ReactNode } from 'react';
import posthog from 'posthog-js';

interface PostHogEventCaptureProps {
  name: string
  origin: string
  children: ReactNode
  wrapper?: keyof JSX.IntrinsicElements
}

function PostHogEventCapture({ name, origin, children, wrapper: Wrapper = 'span' }: PostHogEventCaptureProps) {
  const handleClick = () => {
    posthog.capture(name, { origin })
  }

  return (
    <Wrapper onClick={handleClick} style={{ display: 'inline' }}>
      {children}
    </Wrapper>
  )
}

export default PostHogEventCapture;