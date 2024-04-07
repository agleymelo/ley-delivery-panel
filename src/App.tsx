import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { UserProvider } from './providers/user-provider'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="ley-delivery-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s - Ley Delivery" />
        <Toaster richColors />

        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
