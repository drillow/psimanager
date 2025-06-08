import { api } from '../api'

export type Personal = {
  id: string
  address: string
  cpf: string
  crp: string
  phone_number: string
  first_name: string
  last_name: string
  userId: string
}

export const getPersonData = async (userId: string): Promise<{ data: Personal }> => {
  const response = await api.get(`/api/person/find/${userId}`)

  return response.data
}

export const updatePersonData = async (userId: string, payload: Partial<Personal>) => {
  try {
    const response = await api.patch(`/api/person/update/${userId}`, payload)

    return response.data
  } catch (err) {
    throw new Error('Error: ')
  }
}

export const removeProfilePhoto = async (profileUrl: string, userId: string): Promise<void> => {
  const response = await api.post(`/api/person-image/remove/${userId}`, { fileName: profileUrl })

  return response.data
}

export const getProfileImage = async (userId: string): Promise<{ profileUrl: string }> => {
  const { data } = await api.get(`/api/person-image/${userId}`)

  return data
}

export const saveProfileImage = async (userId: string, file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await api.post(`/api/person-image/upload/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const updateProfileImage = async (userId: string, file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await api.patch(`/api/person-image/update/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
