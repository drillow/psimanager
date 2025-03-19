import { api } from '../api'

export type PatientPayload = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  isWhatsApp: boolean
}

export const saveNewPatient = async (
  userId: string,
  payload: PatientPayload,
) => {
  const response = await api.post(`/api/patient/create/${userId}`, payload)

  return response.data.data
}
