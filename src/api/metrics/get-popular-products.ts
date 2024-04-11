import { api } from '@/lib/axios'

type GetPopularProductReply = {
  popularProducts: {
    product: string
    amount: number
  }[]
}

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductReply>(
    '/metrics/admin/popular-products',
  )

  return response.data
}
