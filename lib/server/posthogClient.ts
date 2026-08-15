import { PostHog } from 'posthog-node';

// Server-side PostHog client. In the Express server this lived in app.ts and
// was imported from there; here it is its own module so route handlers can
// import it without pulling in an app entrypoint.
// Same PostHog project as the browser SDK. Project API keys are write-only
// ingestion keys, so there is no reason for a separate server-side value.
export const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY || 'NA',
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com' },
);
