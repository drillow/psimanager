import { useMutation } from '@tanstack/react-query'
import { PatientPayload, saveNewPatient } from './service'

export const useAddPatient = (userId: string) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: PatientPayload) => saveNewPatient(userId, data),
  })

  return {
    execute: mutate,
    isLoading: isPending,
    isError,
  }
}
