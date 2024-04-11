import { api } from '@/lib/axios'

type CancelOrderQuery = {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderQuery) {
  await api.patch(`/orders/admin/${orderId}/cancel`)
}
