import { api } from '@/lib/axios'

interface UpdateProductReply {}

export interface UpdateProductQuery {
  id: string
  formData: FormData
}

export async function updatePhotoProduct({ id, formData }: UpdateProductQuery) {
  await api.patch<UpdateProductReply>(`/products/admin/${id}/photo`, formData)
}
