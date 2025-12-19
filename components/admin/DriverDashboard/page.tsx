import { Order } from "./columns"
import { fetchOrderConstants, getOrders } from "@/app/actions/notion"
import { formatOrders, getDriverAssignedOrders } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
    <div className="w-full mx-auto pb-10">
      <DriverDashboardTable data={data} />
      <div className="flex flex-col gap-2 border border-grey-200 rounded-md p-4 mt-4">
        <h2 className="text-sm font-medium">Knife Sharpener</h2>
        <a href="https://wa.me/6597424123" target="_blank" rel="noreferrer">
          <Button variant="outline">Whatsapp</Button>
        </a>
        <a href={new URL("https://www.google.com/maps/search/?api=1&query=Blk 308B Ang Mo Kio Ave 1 #25-407 S562308").href} target="_blank" rel="noreferrer">
          <Button variant="outline">Google Maps</Button>
        </a>
      </div>
    </div>
  )
}
