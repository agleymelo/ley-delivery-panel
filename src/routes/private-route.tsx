import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/providers/user-provider'

export function PrivateRoute() {
  const { signed } = useUser()

  if (signed) {
    return <Outlet />
  }

  return <Navigate to="/sign-in" />
}
