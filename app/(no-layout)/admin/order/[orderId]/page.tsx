'use client'
import { use } from 'react'

export default function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = use(params)

  return (
    <div>
      <p>{orderId}</p>
    </div>
  )
}
