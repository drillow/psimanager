import { api } from '../api'

export type Consult = {
  id: string
  completed: false
  patientName: string
  date: string
  endTime: string
  type: string
  place?: string
  url?: string
}

type Response = {
  consults: {
    today: Consult[]
    tomorrow: Consult[]
    inTwoDays: Consult[]
  }
}

export const getNextTreeDaysConsults = async (userId: string): Promise<Response> => {
  const response = await api.get(`/api/consult/dashboard-consults/${userId}`)

  return response.data.data
}

export const getWeekConsults = async (userId: string, weekOffset: number) => {
  const response = await api.get(`/api/consult/list/${userId}/week?weekOffset=${weekOffset}`)

  return response.data.data
}

export const createConsult = async (payload: unknown) => {
  const response = await api.post('/api/consult/create', payload)

  return response.data
}

export const removeConsult = async (consultId: string, removeAllNextConsults: boolean = false) => {
  const response = await api.delete(`/api/consult/${consultId}`, {
    data: { deleteAllNextEvents: removeAllNextConsults },
  })

  return response.data
}

export const updateConsult = async (consultId: string, consultPayload: Partial<Consult>) => {
  const response = await api.patch(`/api/consult/${consultId}`, consultPayload)

  return response.data
}

export const toggleConsultStatus = async (consultId: string, notes?: string) => {
  const response = await api.patch(`/api/consult/${consultId}/toggle-status`, { notes })
  return response.data
}

export const saveAnotations = async (consultId: string, notes: string) => {
  const response = await api.patch(`/api/consult/${consultId}/notes`, { notes })
  return response.data
}

export const getGraphData = async (userId: string) => {
  const response = await api.get(`/api/consult/summary/${userId}/year`)
  return response.data
}

export const getConsultMonthMetric = async (userId: string) => {
  const response = await api.get(`/api/consult/metrics/${userId}/monthly`)
  return response.data
}
// "rrule": "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU"
