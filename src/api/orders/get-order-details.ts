import { api } from '@/lib/axios'

type GetOrderDetailsReply = {
  order: {
    order: {
      id: string
      status:
        | 'pending'
        | 'cancelled'
        | 'processing'
        | 'delivering'
        | 'delivered'
      totalInCents: number
      created_at: string
    }
    customer: {
      name: string
      email: string
      phone: string
    }
    orderItems: Array<{
      id: string
      priceInCents: number
      quantity: number
      product: {
        name: string
      }
    }>
  }
}

type GetOrderDetailsQuery = {
  orderId: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsQuery) {
  const response = await api.get<GetOrderDetailsReply>(
    `/orders/admin/${orderId}`,
  )

  return response.data.order
}
