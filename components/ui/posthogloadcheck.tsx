'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

type PostHogReadyProps = {
  attempts?: number
  interval?: number
}

export default function PostHogReady({
  attempts = 10,
  interval = 300,
}: PostHogReadyProps) {
  useEffect(() => {
    const testEventKey = 'tracking_verified'

    const check = (remainingAttempts: number) => {
      if (posthog.__loaded) {
        try {
          posthog.capture(testEventKey)
        } catch (err) {
          console.warn('⚠️ PostHog failed to send test event:', err)
        }
      } else if (remainingAttempts > 0) {
        setTimeout(() => check(remainingAttempts - 1), interval)
      } else {
        console.warn('❌ PostHog did not load in time.')
      }
    }

    check(attempts)
  }, [attempts, interval])

  return null
}
