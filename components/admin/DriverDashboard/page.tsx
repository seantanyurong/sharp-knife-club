import { Order } from "./columns"
import { fetchOrderConstants, getOrders } from "@/app/actions/notion"
import { formatOrders, getDriverAssignedOrders } from "@/lib/utils"
import DriverDashboardTable from "./DriverDashboardTable"

async function getData(driverId: string): Promise<Order[]> {
  const orderConstants = await fetchOrderConstants();
  const orders = await getOrders(orderConstants.orderGroup);
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
      <DriverDashboardTable data={data} />
    </div>
  )
}
