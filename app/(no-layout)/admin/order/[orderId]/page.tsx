import ProfileCard from "@/components/admin/ProfileCard";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params;

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name='Order Details' subtitle={orderId} />
    </div>
  )
}
