import { useMutation } from '@tanstack/react-query'
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

type UserData = {
  user: User
  token: string
}

type UserContextProps = {
  user: User | null
  userToken: string | undefined
  signIn: (data: SignInInput) => Promise<void>
  setData(data: UserData): void
  signed: boolean
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: SignInUser,
  })

  const userToken = Cookies.get('lay-delivery-panel:token')

  async function setData(data: UserData) {
    setUser(data)
  }

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
    } catch (err: any) {
      if (err.response.data?.message) {
        toast.error(err.response.data.message)
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
          setUser(data.user)
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toast.error('Faça login novamente!')

            Cookies.remove('lay-delivery-panel:token')
          }
        })
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        signIn,
        user,
        setData,
        userToken,
        signed: !!user,
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
