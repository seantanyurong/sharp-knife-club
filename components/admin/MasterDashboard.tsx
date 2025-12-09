import * as React from "react";

import DriverDashboard from "@/components/admin/DriverDashboard/page"


type Props = {
  role: string,
}

export default function MasterDashboard({
  role
}: Props) {

  switch (role) {
    case "admin":
      return <div>admin</div>
    case "sharpener":
      return <div>user</div>
    case "driver":
      return <DriverDashboard />
    default:
      return <div>default</div>
  }
}
