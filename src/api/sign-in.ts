import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

interface SignInReply {
  user: {
    id: string
    name: string
    email: string
    phone: string
    role: string
  }
  token: string
}

export async function SignInUser({ email, password }: SignInBody) {
  const response = await api.post<SignInReply>('/users/sessions', {
    email,
    password,
  })

  return response.data
}
