import { api } from '@/lib/axios'

interface GetAllProductsReply {
  products: Array<{
    id: string
    name: string
    description?: string
    priceInCents: number
    images: string[]
  }>
  meta: {
    pageIndex: number
    perPage: number
    total: number
  }
}

export interface GetAllProductsQuery {
  productId: string | null
  name: string | null
  pageIndex?: number | null
}

export async function getAllProducts({
  productId,
  name,
  pageIndex,
}: GetAllProductsQuery) {
  const response = await api.get<GetAllProductsReply>('/products/admin', {
    params: {
      productId,
      name,
      pageIndex,
    },
  })

  return response.data
}
