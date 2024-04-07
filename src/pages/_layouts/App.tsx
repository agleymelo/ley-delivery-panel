import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { useUser } from '@/providers/user-provider'

export function AppLayout() {
  const { signed } = useUser()

  if (!signed) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <>
      {!signed && null}
      {signed && (
        <div className="flex min-h-screen flex-col antialiased">
          <Header />

          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
            <Outlet />
          </div>
        </div>
      )}
    </>
  )
}
