import * as React from "react"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      orderId: "728ed52f",
      customerName: "John Doe",
      whatsApp: "+1234567890",
      address: "123 Main St, Anytown, USA",
      note: "This is a note",
    },
  ]
}

export default async function DriverDashboard() {
  const data = await getData()

  return (
    <div className="w-full mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
