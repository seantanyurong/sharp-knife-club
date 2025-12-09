'use client'

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import ProfileCard from "@/components/admin/ProfileCard";
import MasterDashboard from "@/components/admin/MasterDashboard";

export default function Dashboard() {

  const { useSession } = authClient;

  const {
    data: session,
    isPending,
  } = useSession()

  if (isPending || !session) {
    return (<div className="flex h-screen w-screen justify-center items-center">
      <h1>Loading...</h1>
    </div>)
  }

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name={session.user.name || 'No Name'} role={session.user.role || 'No Role'} />
      <MasterDashboard role={session.user.role || 'No Role'} />
    </div>
  );
}
