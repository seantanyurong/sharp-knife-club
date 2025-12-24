import ProfileCard from "@/components/admin/ProfileCard";
import { getPageBody } from "@/app/actions/notion";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params;

  const pageBody = await getPageBody(orderId);

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name='Order Details' subtitle={orderId} />
      <div>
        <pre>{JSON.stringify(pageBody, null, 2)}</pre>
      </div>
    </div>
  )
}
