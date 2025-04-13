import { api } from '../api'

type Consult = {
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

export const getNextTreeDaysConsults = async (
  userId: string,
): Promise<Response> => {
  // const response = await api.get(`/api/consult/dashboard-consults/${userId}`, {
  const response = await api.get(`/api/consult/dashboard-consults/${userId}`)

  return response.data.data
}

export const getWeekConsults = async (userId: string, weekOffset: number) => {
  const response = await api.get(
    `/api/consult/list/${userId}/week?weekOffset=${weekOffset}`,
  )

  return response.data.data
}

export const createConsult = async (payload: unknown) => {
  const response = await api.post('/api/consult/create', payload)

  return response.data
}

export const removeConsult = async (
  consultId: string,
  removeAllNextConsults: boolean = false,
) => {
  const response = await api.delete(`/api/consult/${consultId}`, {
    data: { deleteAllNextEvents: removeAllNextConsults },
  })

  return response.data
}
// "rrule": "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU"
