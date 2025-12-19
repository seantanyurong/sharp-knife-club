"use client"

import { makeColumns, Order } from "./columns"
import { DataTable } from "./data-table"
import { useState } from "react"

type Props = {
  data: Order[],
}

export default function DriverDashboardTable({ data }: Props) {
  const [collectedById, setCollectedById] = useState<Record<string, boolean>>(() => Object.fromEntries(data.map((o) => [o.orderId, o.collected])));
  const [deliveredById, setDeliveredById] = useState<Record<string, boolean>>(() => Object.fromEntries(data.map((o) => [o.orderId, o.delivered])));

  const setCollectedAction = (orderId: string, value: boolean) => {
    setCollectedById((prev) => ({ ...prev, [orderId]: value }))
  }

  const setDeliveredAction = (orderId: string, value: boolean) => {
    setDeliveredById((prev) => ({ ...prev, [orderId]: value }))
  }

  const columns = makeColumns({ collectedById, deliveredById, setCollectedAction, setDeliveredAction });

  return (
    <div className="w-full mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
