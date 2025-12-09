'use client'

import * as React from "react";
import { authClient } from "@/lib/auth-client";


export default function ProfileCard() {

  const { useSession } = authClient

  const {
    data: session,
    isPending,
  } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full rounded-lg border p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">{session?.user?.name}</h1>
      <p className="text-center text-gray-500">
        Role: {session?.user?.role}
      </p>
    </div>
  )
}
