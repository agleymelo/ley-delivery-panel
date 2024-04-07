import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/providers/user-provider'

export function AuthLayout() {
  const { signed } = useUser()

  if (signed) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      {signed && !null}
      {!signed && (
        <div className="grid min-h-screen grid-cols-2 antialiased">
          <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
            <div className="flex items-center gap-3 text-lg font-medium text-foreground">
              <span className="font-semibold">Ley Delivery</span>
            </div>
            <footer className="text-sm">
              &copy; {new Date().getFullYear()} Ley Delivery - Painel de
              controle
            </footer>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Outlet />
          </div>
        </div>
      )}
    </>
  )
}
