import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/App'
import { AuthLayout } from '@/pages/_layouts/Auth'
import { Dashboard } from '@/pages/app/Dashboard'
import { Categories } from '@/pages/app/Dashboard/categories/categories'
import { Orders } from '@/pages/app/Dashboard/orders/orders'
import { SignIn } from '@/pages/auth/SignIn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
])
