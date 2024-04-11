import { api } from '@/lib/axios'

type ApproveOrderQuery = {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderQuery) {
  await api.patch(`/orders/admin/${orderId}/approve`)
}
