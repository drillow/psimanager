import { useAuth } from '@/context/auth'
import { useSubscriptionStatus } from '@/context/subscriptionStatus'
import { useSubscriptionStatusQuery } from '@/service/plan/hooks'
import { useEffect } from 'react'
import { LoadingPage } from './LoadingPage'

export const SubscriptionProvider = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()
  const { data, isLoading } = useSubscriptionStatusQuery(user.id)
  const { changeStatus } = useSubscriptionStatus()
  // const isLoading = true

  useEffect(() => {
    if (data) {
      changeStatus(data.status)
    }
  }, [data])

  if (isLoading) {
    return <LoadingPage />
  }

  return children
}
