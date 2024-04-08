import { api } from '@/lib/axios'

interface GetCategoriesReply {}

export interface UpdateCategoryQuery {
  categoryId: string
  name: string
  status: 'active' | 'inactive'
}

export async function updateCategory({
  categoryId,
  name,
  status,
}: UpdateCategoryQuery) {
  const response = await api.put<GetCategoriesReply>(
    `/categories/admin/${categoryId}`,
    {
      name,
      status,
    },
  )

  return response.data
}
