import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/App'
import { AuthLayout } from '@/pages/_layouts/Auth'
import { NotFound } from '@/pages/404'
import { Categories } from '@/pages/app/categories/categories'
import { ShowCategory } from '@/pages/app/categories/category-id/category'
import { CreateCategory } from '@/pages/app/categories/create'
import { Dashboard } from '@/pages/app/dashboard'
import { Orders } from '@/pages/app/orders/orders'
import { CreateProduct } from '@/pages/app/products/create'
import { ShowProduct } from '@/pages/app/products/product-id/product'
import { Products } from '@/pages/app/products/products'
import { SignIn } from '@/pages/auth/SignIn'

import { PrivateRoute } from './private-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        errorElement: <NotFound />,
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
            path: '/category/:categoryId',
            element: <ShowCategory />,
          },
          {
            path: '/category/create',
            element: <CreateCategory />,
          },
          {
            path: '/products',
            element: <Products />,
          },
          {
            path: '/products/:productId',
            element: <ShowProduct />,
          },
          {
            path: '/products/create',
            element: <CreateProduct />,
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
