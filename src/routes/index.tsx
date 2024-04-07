import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/App'
import { AuthLayout } from '@/pages/_layouts/Auth'
import { NotFound } from '@/pages/404'
import { Categories } from '@/pages/app/categories/categories'
import { Dashboard } from '@/pages/app/dashboard'
import { Orders } from '@/pages/app/orders/orders'
import { Products } from '@/pages/app/products/products'
import { SignIn } from '@/pages/auth/SignIn'

import { PrivateRoute } from './private-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/categories',
            element: <Categories />,
          },
          {
            path: '/products',
            element: <Products />,
          },
          {
            path: '/orders',
            element: <Orders />,
          },
        ],
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
