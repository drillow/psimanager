// import { useAuth } from 'LibCmsControlPanel/hooks'
import { useAuth } from '@/context/auth'
import { EPaths } from '@/types'
import { Navigate } from 'react-router-dom'
// import { EPaths } from 'types'

export const PrivateRouter = ({
  children,
  permissions,
}: {
  children: JSX.Element
  permissions?: string[]
}) => {
  const {  validateToken } = useAuth()

  if (!validateToken()) {
    return <Navigate to={EPaths.LOGIN} replace />
  }

  return children
}
