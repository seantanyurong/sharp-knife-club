import * as React from "react"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { fetchOrderConstants, getOrders } from "@/app/actions/notion"
import { formatOrders } from "@/lib/utils"

async function getData(): Promise<Payment[]> {
  const orderConstants = await fetchOrderConstants();
  const orders = await getOrders(orderConstants.orderGroup);
  if (!orders) {
    return [];
  }
  const formattedOrders = formatOrders(orders);
  return formattedOrders;
}

export default async function DriverDashboard() {
  const data = await getData()

  return (
    <div className="w-full mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
