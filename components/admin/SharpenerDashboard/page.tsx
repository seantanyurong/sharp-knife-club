import { type Order } from "../Types"
// Server component — call the Notion helpers directly rather than fetching
// this app's own API routes over HTTP.
import { getOrderConstants, getOrders } from "@/lib/server/notion"
import { formatOrders } from "@/lib/utils"
import SharpenerDashboardTable from "./SharpenerDashboardTable/SharpenerDashboardTable"

async function getData(sharpenerId: string): Promise<Order[]> {
  const orderConstants = await getOrderConstants();
  const orders = await getOrders({ orderGroup: orderConstants.serviceOrderGroup.orderGroupNumber, sharpenerId });
  if (!orders) {
    return [];
  }
  const formattedOrders = formatOrders(orders);
  return formattedOrders;
}

type Props = {
  sharpenerId: string,
}

export default async function SharpenerDashboard({ sharpenerId }: Props) {
  const data = await getData(sharpenerId)

  return (
    <div className="w-full mx-auto pb-10">
      <SharpenerDashboardTable data={data} />
    </div>
  )
}
