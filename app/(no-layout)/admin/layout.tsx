import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

// Guards every /admin route. proxy.ts only checks that a session cookie
// exists (Next 16 requires it to be synchronous), so this is where the
// session is actually validated.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return <>{children}</>;
}
