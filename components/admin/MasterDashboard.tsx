import * as React from "react";

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
      return <div>driver</div>
    default:
      return <div>default</div>
  }
}
