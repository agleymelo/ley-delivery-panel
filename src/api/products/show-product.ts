import { api } from '@/lib/axios'

interface ShowProductReply {
  product: {
    id: string
    name: string
    description?: string
    priceInCents: number
    images: string[]
  }
}

export interface ShowProductQuery {
  productId: string | undefined
}

export async function showProduct({ productId }: ShowProductQuery) {
  const response = await api.get<ShowProductReply>(`/products/${productId}`)

  return response.data.product
}
