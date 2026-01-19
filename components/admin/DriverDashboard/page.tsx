import SharpenerInfo from "./SharpenerInfo"
import { type Order } from "../Types"
import DriverOrderPaymentInfo from "./DriverOrderPaymentInfo"
import { fetchOrderConstants, getOrders } from "@/app/actions/notion"
import { formatOrders } from "@/lib/utils"
import DriverDashboardTable from "./DriverDashboardTable/DriverDashboardTable"

async function getData(driverId: string): Promise<Order[]> {
  const orderConstants = await fetchOrderConstants();
  const orders = await getOrders({ orderGroup: orderConstants.driverOrderGroup.orderGroupNumber, driverId });
  if (!orders) {
    return [];
  }
  const formattedOrders = formatOrders(orders);
  return formattedOrders;
}

type Props = {
  driverId: string,
}

export default async function DriverDashboard({ driverId }: Props) {
  const data = await getData(driverId)

  return (
    <div className="w-full mx-auto pb-10">
      <DriverDashboardTable data={data} />
      <SharpenerInfo />
      <DriverOrderPaymentInfo orderCount={data.length} />
    </div>
  )
}
