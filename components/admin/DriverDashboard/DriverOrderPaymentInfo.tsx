export default function DriverOrderPaymentInfo({ orderCount }: { orderCount: number }) {
  return (
    <div className="flex flex-col gap-2 border border-grey-200 rounded-md p-4 mt-4">
      <h2 className="text-sm font-medium">Total Payment</h2>
      <p>{orderCount} order(s) x $16 = ${orderCount * 16}</p>
    </div>
  )
}
