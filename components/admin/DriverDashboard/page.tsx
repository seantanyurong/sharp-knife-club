import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { fetchOrderConstants, getOrders } from "@/app/actions/notion"
import { formatOrders, getDriverAssignedOrders } from "@/lib/utils"

async function getData(driverId: string): Promise<Payment[]> {
  const orderConstants = await fetchOrderConstants();
  const orders = await getOrders(orderConstants.orderGroup);
  console.log(orders);
  if (!orders) {
    return [];
  }
  const assignedOrders = getDriverAssignedOrders(orders, driverId);
  const formattedOrders = formatOrders(assignedOrders);
  return formattedOrders;
}

type Props = {
  driverId: string,
}

export default async function DriverDashboard({ driverId }: Props) {
  const data = await getData(driverId)

  return (
    <div className="w-full mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
