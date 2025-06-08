import { api } from '../api'

export const makeSubscription = async (userId: string) => {
  try {
    const response = await api.post(`/api/stripe/create-subscription-checkout/${userId}`)
    return response.data
  } catch (err) {
    throw new Error('Error')
  }
}

export const getFinancialPortal = async (userId: string): Promise<{ url: string }> => {
  try {
    const response = await api.post(`/api/stripe/create-portal/${userId}`)
    return response.data
  } catch (err) {
    throw new Error('Error')
  }
}

export const getSubscriptionStatus = async (userId: string) => {
  try {
    const response = await api.get(`/api/stripe/subscription-status/${userId}`)
    return response.data
  } catch (error) {
    throw new Error('Error')
  }
}
