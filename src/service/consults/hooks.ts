import { useQuery } from '@tanstack/react-query'
import { getNextTreeDaysConsults, getWeekConsults } from './service'

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
    queryKey: ['WEEK_CONSULTS', weekOffset],
    queryFn: () => getWeekConsults(userId, weekOffset),
  })

  return {
    data,
    isLoading,
    isError,
  }
}
