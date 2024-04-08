import { api } from '@/lib/axios'

export interface DeleteCategoryQuery {
  categoryId: string | undefined
}

export async function deleteCategory({ categoryId }: DeleteCategoryQuery) {
  await api.delete(`/categories/admin/${categoryId}`)
}
