'use client'

import * as React from "react";
import { authClient } from "@/lib/auth-client";

export default function MasterDashboard() {
  const { useSession } = authClient;

  const {
    data: session,
    isPending,
  } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  switch (session?.user?.role) {
    case "admin":
      return <div>admin</div>
    case "sharpener":
      return <div>user</div>
    case "driver":
      return <div>driver</div>
    default:
      return <div>default</div>
  }
}
