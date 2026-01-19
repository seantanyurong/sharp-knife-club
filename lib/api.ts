export type NotionPickupOrder = {
  pageId: string
  position: number // or rank/index
}

const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://server.knifesharpening.sg';

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
