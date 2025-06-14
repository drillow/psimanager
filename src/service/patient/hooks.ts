import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deletePatient,
  editPatient,
  getAllPatients,
  getSelectListPatient,
  PatientPayload,
  saveNewPatient,
} from './service'

export const useGetPatient = (userId: string, page: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['PATIENT_LIST', page],
    queryFn: () => getAllPatients(userId, page),
  })

  return {
    data,
    isLoading,
    isError,
  }
}
export const useAddPatient = (userId: string, onSuccess?: () => void) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: PatientPayload) => saveNewPatient(userId, data),
    onSuccess,
  })

  return {
    execute: mutate,
    isLoading: isPending,
    isError,
  }
}

export const useDeletePatient = (userId: string, onSuccess?: () => void) => {
  const { isPending, mutate, isError } = useMutation({
    mutationFn: (patientId: string) => deletePatient(userId, patientId),
    onSuccess,
  })

  return {
    execute: mutate,
    isLoading: isPending,
    isError,
  }
}

export const useGetSelectListPatient = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['SELECT_PATIENT'],
    queryFn: () => getSelectListPatient(userId),
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export const useEditPatient = (userId: string, patientId: string, onSuccess?: () => void) => {
  const { isPending, mutateAsync, isError } = useMutation({
    mutationFn: (payload: PatientPayload) => editPatient(userId, patientId, payload),
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}
