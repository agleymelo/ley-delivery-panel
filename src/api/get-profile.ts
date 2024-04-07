import { api } from '@/lib/axios'

interface GetProfileReply {
  user: {
    id: string
    name: string
    email: string
    phone: string
    role: string
  }
}

export async function getProfile() {
  const response = await api.get<GetProfileReply>('/users/profile')

  return response.data
}
