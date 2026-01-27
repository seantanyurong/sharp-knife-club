import * as React from "react";

import DriverDashboard from "@/components/admin/DriverDashboard/page"
import SharpenerDashboard from "@/components/admin/SharpenerDashboard/page"

type Props = {
  role: string,
  userId: string,
}

export default function MasterDashboard({
  role,
  userId
}: Props) {

  switch (role) {
    case "admin":
      return <div>admin</div>
    case "sharpener":
      return <SharpenerDashboard sharpenerId={userId} />
    case "driver":
      return <DriverDashboard driverId={userId} />
    default:
      return <div className="w-full mx-auto py-10">
        <h1 className="text-center font-bold">
          Sean will be assigning you a role soon!
        </h1>
      </div>
  }
}
