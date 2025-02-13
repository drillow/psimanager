// import { useAuth } from 'LibCmsControlPanel/hooks'
import { useAuth } from '@/context/auth'
import { EPaths } from '@/types'
import { Navigate } from 'react-router-dom'
// import { EPaths } from 'types'

export const PrivateRouter = ({ children }: { children: JSX.Element }) => {
  const { validateToken } = useAuth()

  if (!validateToken()) {
    return <Navigate to={EPaths.LOGIN} replace />
  }

  return children
}
