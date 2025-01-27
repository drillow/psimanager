import { api } from "../api"

export const signIn = async (payload): Promise<{ access_token: string, message?: string, code?: number }> => {
  const response = await api.post(`/api/auth/signin`, payload)

  return response.data
}

export const signUp = async (payload): Promise<{ access_token: string }> => {
  const response = await api.post(`/api/auth/signup`, payload)

  return response.data
}

export const recovery = async (payload: { email: string }): Promise<void> => {
  const { data } = await api.post('/api/auth/recovery', payload)

  return data
}