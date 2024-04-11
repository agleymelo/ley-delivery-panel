import { api } from '@/lib/axios'

type DispatchOrderQuery = {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderQuery) {
  await api.patch(`/orders/admin/${orderId}/dispatch`)
}
