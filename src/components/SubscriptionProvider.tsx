import { useAuth } from "@/context/auth"
import { useSubscriptionStatus } from "@/context/subscriptionStatus"
import { handleSubscriptionStatus } from "@/service/plan/hooks"
import { useEffect } from "react"

export const SubscriptionProvider = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()
  const { data, isLoading } = handleSubscriptionStatus(user.id)
  const { changeStatus } = useSubscriptionStatus()

  useEffect(() => {
    if (data) {
      changeStatus(data.status)
    }
  }, [data])

  if (isLoading) {
    return <p>Loading</p>
  }

  return children
}