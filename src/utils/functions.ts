import { format, formatISO, isBefore, parseISO } from 'date-fns'

export const calculateNextDateByNumberOfDaysAfter = (daysAfter: number) => {
  const currentDate = new Date()

  const newDate = currentDate.setDate(currentDate.getDate() + daysAfter)

  return {
    date: format(newDate, "d 'de' MMM"),
    weekDay: format(newDate, 'E')?.slice(0, 3).toUpperCase(),
    isoData: formatISO(newDate),
  }
}

export const meetingIsCompleted = (date: string) => {
  return isBefore(parseISO(date), new Date())
}

export const getFirstFourItems = <T>(array: Array<T> | undefined) => {
  if (!array) return []

  return array?.slice(0, 4)
}
