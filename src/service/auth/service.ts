import { AxiosError } from 'axios';
import { apiWithoutHeader } from '../auth.api'

export const signIn = async (payload: {
  email: string
  password: string
}): Promise<{ access_token: string; message?: string; code?: number }> => {
  const response = await apiWithoutHeader.post(`/api/auth/signin`, payload)
  return response.data
}

export const signUp = async (
  payload: unknown,
): Promise<{ access_token: string }> => {
  const response = await apiWithoutHeader.post(`/api/auth/signup`, payload)

  return response.data
}

export const recovery = async (payload: { email: string }): Promise<void> => {
  const { data } = await apiWithoutHeader.post('/api/auth/recovery', payload)

  return data
}

export const changePassword = async ({ userId, newPassword, oldPassword }: { userId: string, newPassword: string, oldPassword: string }): Promise<void> => {
  try {
    const { data } = await apiWithoutHeader.post(`/api/auth/reset/${userId}`, { newPassword, oldPassword })
    return data
  } catch(err: any) {
    throw new Error(err)
  }
}
