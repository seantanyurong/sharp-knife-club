import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileCard from "@/components/admin/ProfileCard";
import MasterDashboard from "@/components/admin/MasterDashboard";

export default async function Dashboard() {

  const response = await auth.api.getSession({
    headers: await headers()
  })

  const user = response?.user;

  if (!user) {
    return (<div className="flex h-screen w-screen justify-center items-center">
      <h1>Loading...</h1>
    </div>)
  }

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name={user.name || 'No Name'} role={user.role || 'No Role'} />
      <MasterDashboard role={user.role || 'No Role'} userId={user.id || 'No ID'} />
    </div>
  );
}
