'use client'

import posthog from 'posthog-js'

function PostHogEventCapture({ name, origin, children } : { name: string; origin: string; children: React.ReactNode }) {
  return (
    <a onClick={() => posthog.capture(name, { origin: origin })}>
      {children}
    </a>
  )
}

export default PostHogEventCapture