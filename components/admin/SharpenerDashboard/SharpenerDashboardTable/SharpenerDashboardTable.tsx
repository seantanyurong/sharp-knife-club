"use client"

import { makeColumns } from "./Columns"
import { DataTable } from "./DataTable"
import { useState } from "react"
import { type Order } from "../../Types"

type Props = {
  data: Order[],
}

export default function SharpenerDashboardTable({ data }: Props) {
  const [submittedBeforePictureById, setSubmittedBeforePictureById] = useState<Record<string, boolean>>(() => Object.fromEntries(data.map((o) => [o.orderId, o.submittedBeforePicture])));

  const setSubmittedBeforePictureAction = (orderId: string, value: boolean) => {
    setSubmittedBeforePictureById((prev) => ({ ...prev, [orderId]: value }))
  }

  const columns = makeColumns({ submittedBeforePictureById, setSubmittedBeforePictureAction });

  return (
    <div className="w-full mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
