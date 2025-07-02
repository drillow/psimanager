import { useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { getFinancialPortal, getSubscriptionStatus, makeSubscription } from './service'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/utils/queryKeys'
import { useSubscriptionStatus } from '@/context/subscriptionStatus'

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false)
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createSubscriptionStripeCheckout(userId: string) {
    if (!stripe) return
    setIsLoading(true)

    try {
      const data = await makeSubscription(userId)
      setIsLoading(false)
      console.log(data)
      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleCreateStripePortal(userId: string) {
    setIsLoading(true)
    const data = await getFinancialPortal(userId)
    setIsLoading(false)

    window.location.href = data.url
  }

  return {
    isLoading,
    handleCreateStripePortal,
    createSubscriptionStripeCheckout,
  }
}

export const useSubscriptionStatusQuery = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.SUBSCRIPTION.STATUS,
    queryFn: async () => await getSubscriptionStatus(userId),
  })

  const { changeStatus } = useSubscriptionStatus()

  useEffect(() => {
    if (data) {
      changeStatus(data.status)
    }
  }, [data, changeStatus])

  return {
    data,
    isLoading,
    isError,
  }
}
