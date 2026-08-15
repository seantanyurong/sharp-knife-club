export type NotionPickupOrder = {
  pageId: string
  position: number // or rank/index
}

/**
 * These endpoints now live in this app under /api. In the browser a relative
 * path is enough; on the server (server components / actions) fetch needs an
 * absolute URL, so resolve one from the deployment environment.
 */
function apiUrl(path: string) {
  if (typeof window !== 'undefined') return `/api${path}`;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    'http://localhost:3000';

  return `${base}/api${path}`;
}

export async function getOrderConstants() {
  const res = await fetch(apiUrl('/notion/get-order-constants'), {
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
  const res = await fetch(apiUrl(`/notion/get-orders?${params.toString()}`), {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
  if (!res.ok) {
    throw new Error("Failed to get Notion orders")
  }
  return await res.json()
}

export async function updateNotionPickupOrder(pickupOrder: NotionPickupOrder[], signal?: AbortSignal) {
  const res = await fetch(apiUrl("/notion/update-pickup-order"), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pickupOrder }),
    signal,
  })
  if (!res.ok) {
    throw new Error("Failed to update Notion pickup order")
  }
}
