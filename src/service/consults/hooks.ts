import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Consult,
  createConsult,
  getNextTreeDaysConsults,
  getWeekConsults,
  removeConsult,
  toggleConsultStatus,
  updateConsult,
} from './service'
import { QueryKeys } from '@/utils/queryKeys'

export const useNextTreeDaysConsults = (userId: string, enabled: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.CONSULTS.NEXT_TREE_DAYS,
    queryFn: () => getNextTreeDaysConsults(userId),
    enabled,
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export const useGetWeekConsults = (userId: string, weekOffset: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.CONSULTS.WEEK(weekOffset),
    queryFn: () => getWeekConsults(userId, weekOffset),
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export const useAddNewConsult = (onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (payload: unknown) => createConsult(payload),
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}

export const useDeleteConsult = (onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      consultId,
      removeAllNextConsults,
    }: {
      consultId: string
      removeAllNextConsults: boolean
    }) => removeConsult(consultId, removeAllNextConsults),
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}

export const useUpdateConsult = (onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({ consultId, consultPayload }: { consultId: string, consultPayload: Partial<Consult> }) => updateConsult(consultId, consultPayload),
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}

export const useToggleConsultStatus = (onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (consultId: string) => toggleConsultStatus(consultId),
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}