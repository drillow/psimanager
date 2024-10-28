import Layout from "@/components/layout/Layout"
import { Billings } from "@/pages/Billings"
import { Home } from "@/pages/Home"
import { Patients } from "@/pages/Patients"
import { Plans } from "@/pages/Plans"
import { Services } from "@/pages/Services"
import { Settings } from "@/pages/Settings"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Home />
      },
      {
        path: 'weekly-consults',
        element: <Services />
      },
      {
        path: 'patients',
        element: <Patients />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'plan',
        element: <Plans />
      },
      {
        path: 'billing',
        element: <Billings />
      }
    ]
  }
])

export const Router = () => {
  return (
    <RouterProvider router={router}/>
  )
}