import { getData } from "@/lib/actions/orderAction";
import Orders from "@/components/orders";

export default async function Home() {
  const data = await getData();
  return <Orders orders={data} />;
}
