import { api } from '@/lib/axios'

export interface GetCategoriesQuery {
  name: string
  status: 'active' | 'inactive'
}

export async function createCategory({ name, status }: GetCategoriesQuery) {
  await api.post('/categories/admin', {
    name,
    status,
  })
}
