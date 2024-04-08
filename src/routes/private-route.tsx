import { Navigate, Outlet } from 'react-router-dom'

import { LayoutSkeleton } from '@/components/skeleton/pages/layout-skeleton'
import { useUser } from '@/providers/user-provider'

export function PrivateRoute() {
  const { signed, isLoadingProfile } = useUser()

  if (isLoadingProfile) {
    return <LayoutSkeleton />
  }

  if (signed) {
    return <Outlet />
  }

  return <Navigate to="/sign-in" replace />
}
