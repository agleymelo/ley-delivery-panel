import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

import { getProfile } from '@/api/get-profile'
import { SignInUser } from '@/api/sign-in'
import { api } from '@/lib/axios'

type SignInInput = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: string
}

type UserContextProps = {
  user: User | null
  userToken: string | undefined
  signIn: (data: SignInInput) => Promise<void>
  signed: boolean
  isLoadingProfile: boolean
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: SignInUser,
  })
  const userToken = Cookies.get('lay-delivery-panel:token')

  async function signIn({ email, password }: SignInInput): Promise<void> {
    try {
      const result = await authenticate({ email, password })

      const { data } = result

      if (data?.user?.role !== 'admin') {
        toast.error('Você não tem permissão para acessar o painel!')
        return
      }

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`

      Cookies.set('lay-delivery-panel:token', data.token, {
        expires: 1000 * 60 * 60 * 24 * 1,
        path: '/',
        secure: true,
      })

      setUser(data.user)

      toast.success('Login realizado com sucesso!')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast.error('Usuário ou senha inválidos!')
        }
      }
      toast.error('Erro ao realizar login!')
    }
  }

  useEffect(() => {
    const token = Cookies.get('lay-delivery-panel:token')

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      getProfile()
        .then((data) => {
          setIsLoading(false)
          setUser(data.user)
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toast.error('Faça login novamente!')

            Cookies.remove('lay-delivery-panel:token')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (!token) {
      setIsLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        signIn,
        user,
        userToken,
        signed: !!user,
        isLoadingProfile: isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within an UserProvider')
  }

  return context
}
