import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createConsult,
  getNextTreeDaysConsults,
  getWeekConsults,
  removeConsult,
} from './service'
import { QueryKeys } from '@/utils/queryKeys'

export const useNextTreeDaysConsults = (userId: string, enabled: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['NEXT_TREE_DAYS_CONSULTS'],
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
    queryKey: [QueryKeys.WEEK_CONSULTS, weekOffset],
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
