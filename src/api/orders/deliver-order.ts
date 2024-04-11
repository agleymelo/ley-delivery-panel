import { api } from '@/lib/axios'

type DeliverOrderQuery = {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderQuery) {
  await api.patch(`/orders/admin/${orderId}/deliver`)
}
