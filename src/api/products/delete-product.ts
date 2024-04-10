import { api } from '@/lib/axios'

export interface DeleteProductQuery {
  productId: string | undefined
}

export async function deleteProduct({ productId }: DeleteProductQuery) {
  await api.delete(`/products/admin/${productId}`)
}
