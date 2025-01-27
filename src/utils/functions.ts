import { format, isBefore, parseISO } from "date-fns"
import jwt, { sign } from 'jsonwebtoken'

export const calculateNextDateByNumberOfDaysAfter = (daysAfter: number) => {
  const currentDate = new Date()

  const newDate = currentDate.setDate(currentDate.getDate() + daysAfter)

  return {
    date: format(newDate, "d 'de' MMM"),
    weekDay: format(newDate, 'E')?.slice(0, 3).toUpperCase()
  }
}

export const meetingIsCompleted = (day: string, hour: string) => {
  return isBefore(parseISO(`${day}T${hour}`), new Date())
}

export const getFirstFourItems = (array: Array<any>) => {
  return array?.slice(0, 4);
};
