import Layout from '@/components/layout/Layout'
import { Billings } from '@/pages/Billings/Billings'
import { Home } from '@/pages/Dashboard/Home'
import { Patients } from '@/pages/Patients/Patients'

import Services from '@/pages/Consults/Services'
import { setDefaultOptions } from 'date-fns'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ptBR } from 'date-fns/locale'
import { AuthProvider } from '@/context/auth'
import { PrivateRouter } from '@/components/PrivateRouter'
import { Login } from '@/pages/Auth/Login'
import { GoogleConnect } from '@/pages/GoogleConnectCallback/GoogleConnect'
import { SubscriptionProvider } from '@/components/SubscriptionProvider'
import Metrics from '@/pages/Metrics/Metrics'

// const Metrics = lazy(() => import('@/pages/Metrics'))

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'connect-google',
    element: <GoogleConnect />,
  },
  {
    path: '/',
    element: (
      <PrivateRouter>
        <SubscriptionProvider>
          <Layout />
        </SubscriptionProvider>
      </PrivateRouter>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'weekly-consults',
        element: <Services />,
      },
      {
        path: 'patients',
        element: <Patients />,
      },
      {
        path: 'billing',
        element: <Billings />,
      },
      {
        path: 'metrics',
        element: <Metrics />,
      },
    ],
  },
])

export const Router = () => {
  setDefaultOptions({ locale: ptBR })

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
