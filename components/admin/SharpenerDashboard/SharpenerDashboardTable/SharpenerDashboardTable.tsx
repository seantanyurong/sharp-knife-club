"use client"

import { makeColumns } from "./Columns"
import { DataTable } from "./DataTable"
import { useState } from "react"
import { type Order } from "../../Types"

type Props = {
  data: Order[],
}

export default function SharpenerDashboardTable({ data }: Props) {
  const [collectedById, setCollectedById] = useState<Record<string, boolean>>(() => Object.fromEntries(data.map((o) => [o.orderId, o.collected])));

  const setCollectedAction = (orderId: string, value: boolean) => {
    setCollectedById((prev) => ({ ...prev, [orderId]: value }))
  }

  const columns = makeColumns({ collectedById, setCollectedAction });

  return (
    <div className="w-full mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
