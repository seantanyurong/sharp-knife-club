export type NotionPickupOrder = {
  pageId: string
  position: number // or rank/index
}

const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://server.knifesharpening.sg';

export async function getOrderConstants() {
  const res = await fetch(`${SERVER_URL}/notion/get-order-constants`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
  if (!res.ok) {
    throw new Error("Failed to get Notion pickup order constants")
  }
  return await res.json()
}

type GetOrdersParams = {
  orderGroup: number;
  driverId?: string;
  sharpenerId?: string;
  includeUrgent?: boolean;
};

export async function getOrders({ orderGroup, driverId, sharpenerId, includeUrgent = false }: GetOrdersParams) {
  const params = new URLSearchParams({
    orderGroup: orderGroup.toString(),
    ...(driverId && { driverId }),
    ...(sharpenerId && { sharpenerId }),
    includeUrgent: includeUrgent.toString(),
  })
  const res = await fetch(`${SERVER_URL}/notion/get-orders?${params.toString()}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
  if (!res.ok) {
    throw new Error("Failed to get Notion orders")
  }
  return await res.json()
}

export async function updateNotionPickupOrder(pickupOrder: NotionPickupOrder[], signal?: AbortSignal) {
  const res = await fetch(`${SERVER_URL}/notion/update-pickup-order`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pickupOrder }),
    signal,
  })
  if (!res.ok) {
    throw new Error("Failed to update Notion pickup order")
  }
}
