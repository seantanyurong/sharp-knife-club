// app/providers.tsx
'use client'

import React from 'react'
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      capture_pageview: false // Disable automatic pageview capture, as we capture manually
    })

    if (typeof window !== 'undefined') {
      (window as any).posthog = posthog;
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track UTM parameters: persist to localStorage and register as super properties
  useEffect(() => {
    if (posthog) {
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
      const utmParams: Record<string, string> = {};

      for (const key of utmKeys) {
        const value = searchParams.get(key);
        if (value !== null) utmParams[key] = value;
      }

      if (Object.keys(utmParams).length > 0) {
        // New UTM params in URL: save to localStorage and register
        localStorage.setItem("utm_params", JSON.stringify(utmParams));
        posthog.register(utmParams);
        posthog.setPersonProperties(utmParams);
      } else {
        // No UTM params in URL: restore from localStorage
        const stored = localStorage.getItem("utm_params");
        if (stored) {
          const storedParams = JSON.parse(stored);
          posthog.register(storedParams);
        }
      }
    }
  }, [posthog, searchParams])

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
