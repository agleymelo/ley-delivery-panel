import { api } from '@/lib/axios'

interface UpdateProductReply {
  id: string
}

export interface UpdateProductQuery {
  id: string
  name: string
  description?: string
  priceInCents: number
}

export async function updateProduct({
  id,
  name,
  description,
  priceInCents,
}: UpdateProductQuery) {
  const response = await api.put<UpdateProductReply>(`/products/admin/${id}`, {
    name,
    description,
    priceInCents,
  })

  return response.data
}
