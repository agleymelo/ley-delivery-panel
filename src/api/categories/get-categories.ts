import { api } from '@/lib/axios'

interface GetCategoriesReply {
  categories: Array<{
    id: string
    name: string
    status: 'active' | 'inactive'
    created_at: Date
  }>
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface GetCategoriesQuery {
  pageIndex?: number | null
  categoryId?: string | null
  name?: string | null
  status?: string | 'active' | 'inactive' | null
}

export async function getCategories({
  pageIndex,
  categoryId,
  name,
  status,
}: GetCategoriesQuery) {
  const response = await api.get<GetCategoriesReply>('/categories/admin', {
    params: {
      pageIndex,
      id: categoryId,
      name,
      status,
    },
  })

  return response.data
}
