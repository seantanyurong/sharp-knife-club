import { auth } from '@/lib/auth'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession(req);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
  runtime: 'nodejs',
}
