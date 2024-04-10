import { api } from '@/lib/axios'

interface CreateProductReply {
  id: string
}

export interface CreateProductQuery {
  name: string
  description?: string
  priceInCents: number
  categoryId: string
}

export async function crateProduct({
  name,
  description,
  priceInCents,
  categoryId,
}: CreateProductQuery) {
  const response = await api.post<CreateProductReply>('/products/admin', {
    name,
    description,
    images: [],
    priceInCents,
    categoryId,
  })

  return response.data
}
