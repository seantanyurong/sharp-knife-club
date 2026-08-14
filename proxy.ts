import { getSessionCookie } from 'better-auth/cookies'
import { NextResponse, NextRequest } from 'next/server'

// Next 16 requires proxy to be synchronous, so this is only an optimistic
// check that a session cookie exists. Real session validation happens in each
// /admin route's server component.
export function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
}
