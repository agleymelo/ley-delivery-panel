import { api } from '@/lib/axios'

interface ShowCategoryReply {
  category: {
    id: string
    name: string
    status: 'active' | 'inactive'
    created_at: Date
  }
}

export interface ShowCategoryQuery {
  categoryId: string | undefined
}

export async function showCategory({ categoryId }: ShowCategoryQuery) {
  const response = await api.get<ShowCategoryReply>(
    `/categories/admin/${categoryId}`,
  )

  return response.data.category
}
