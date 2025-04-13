import Layout from '@/components/layout/Layout'
import { Billings } from '@/pages/Billings'
import { Home } from '@/pages/Home'
import { Patients } from '@/pages/Patients'
import { Plans } from '@/pages/Plans'
import Services from '@/pages/Services'
import { setDefaultOptions } from 'date-fns'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ptBR } from 'date-fns/locale'
import { AuthProvider } from '@/context/auth'
import { PrivateRouter } from '@/components/PrivateRouter'
import { Login } from '@/pages/Login'
import { GoogleConnect } from '@/pages/GoogleConnect'

// const Services = lazy(async () => await import('@/pages/Services'))

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
        <Layout />
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
        path: 'plan',
        element: <Plans />,
      },
      {
        path: 'billing',
        element: <Billings />,
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
