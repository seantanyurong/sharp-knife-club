import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/admin/ProfileCard";
import MasterDashboard from "@/components/admin/MasterDashboard";
import { startCase } from 'lodash'

export default async function Dashboard() {

  const response = await auth.api.getSession({
    headers: await headers()
  })

  const user = response?.user;

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name={user.name || 'No Name'} subtitle={user.role ? startCase(user.role) : 'No Role'} />
      <MasterDashboard role={user.role || 'No Role'} userId={user.id || 'No ID'} />
    </div>
  );
}
