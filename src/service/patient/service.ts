import { api } from '../api'

export type PatientPayload = {
  id?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  isWhatsApp: boolean
  patientId?: string
  age?: number
}

export const getAllPatients = async (userId: string) => {
  const response = await api.get(`/api/patient/${userId}/patients`)

  return response.data
}

export const saveNewPatient = async (userId: string, payload: PatientPayload) => {
  const response = await api.post(`/api/patient/create/${userId}`, payload)

  return response.data.data
}

export const deletePatient = async (userId: string, patientId: string) => {
  const response = await api.delete(`/api/patient/${userId}/patient/${patientId}`)

  return response.data
}

export const getSelectListPatient = async (userId: string) => {
  const response = await api.get(`/api/patient/${userId}/select-patient`)

  return response.data
}

export const editPatient = async (userId: string, patientId: string, payload: PatientPayload) => {
  const response = await api.put(`/api/patient/${userId}/patient/${patientId}`, payload)

  return response.data
}
