import { api } from '@/lib/axios'

export interface GetOrdersReply {
  orders: Array<{
    orderId: string
    created_at: string
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled'
    total: number
    customerName: string
  }>
  meta: {
    pageIndex: number
    perPage: number
    total: number
  }
}

export interface GetOrdersReplyQuery {
  orderId?: string | null
  customerName?: string | null
  status?: string | null
  pageIndex?: number | null
}

export async function getOrders({
  orderId,
  customerName,
  status,
  pageIndex,
}: GetOrdersReplyQuery) {
  const response = await api.get<GetOrdersReply>('/orders/admin', {
    params: {
      orderId,
      customerName,
      status,
      pageIndex,
    },
  })

  return response.data
}
