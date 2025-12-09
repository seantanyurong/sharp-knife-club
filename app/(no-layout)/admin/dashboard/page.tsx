import * as React from "react";
import ProfileCard from "@/components/admin/ProfileCard";
import MasterDashboard from "@/components/admin/MasterDashboard";

export default function Dashboard() {
  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard />
      <MasterDashboard />
    </div>
  );
}
