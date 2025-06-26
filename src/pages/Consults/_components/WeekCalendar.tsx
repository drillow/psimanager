import { useEffect, useState } from 'react'
import { EventCard } from './EventCard'
import { cx } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export interface CalendarEvent {
  id: string
  patientName: string
  date: string // ISO datetime format: "2025-06-05T23:00:00.000Z"
  place: string
  type: 'IN_PERSON' | 'ONLINE'
  url: string | null
  completed: boolean
  consultDuration: number // in minutes
  notes?: string
}

interface WeekCalendarProps {
  weekOffset: number
  events: CalendarEvent[]
  setWeekOffset: (arg: number) => void
}

const timeSlots = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  weekOffset,
  setWeekOffset,
  events,
}) => {
  // const [weekOffset, setWeekOffset] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  const isCurrentWeek = () => {
    return weekOffset === 0
  }

  const getCurrentTimePosition = () => {
    const now = currentTime
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const totalMinutes = hours * 60 + minutes
    const position = (totalMinutes / 60) * 5 // 5rem per hour
    return position
  }

  const getWeekDates = (offset: number) => {
    const week = []
    const today = new Date()
    const startOfWeek = new Date(today)
    const day = startOfWeek.getDay()

    startOfWeek.setDate(startOfWeek.getDate() - day)

    startOfWeek.setDate(startOfWeek.getDate() + offset * 7)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)
      week.push(currentDate)
    }
    return week
  }

  const weekDates = getWeekDates(weekOffset)

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isEventOnDate = (eventDate: string, targetDate: Date) => {
    const event = new Date(eventDate)
    return event.toDateString() === targetDate.toDateString()
  }

  const getTodayColumnIndex = () => {
    if (!isCurrentWeek()) return -1

    const today = new Date()
    return weekDates.findIndex((date) => date.toDateString() === today.toDateString())
  }

  const getCurrentHour = () => {
    return currentTime.getHours()
  }

  const todayColumnIndex = getTodayColumnIndex()
  const currentHour = getCurrentHour()
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-white">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-[calc(100vh-140px)]">
        <div
          className="grid border-b border-gray-200 sticky top-0 z-30 bg-white shadow-sm"
          style={{ gridTemplateColumns: '120px repeat(7, 1fr)' }}
        >
          <div className=" bg-gray-50 border-r border-gray-200 flex items-center">
            <Button
              variant={'outline'}
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="rounded-none w-full h-full border-none py-1"
            >
              <ChevronLeft />
            </Button>
            <Separator orientation="vertical" />
            <Button
              variant={'outline'}
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="rounded-none w-full h-full border-none py-1"
            >
              <ChevronRight />
            </Button>
          </div>
          {weekDates.map((date, index) => {
            const dayName = daysOfWeek[index]
            const dayNumber = date.getDate().toString().padStart(2, '0')
            // const month = (date.getMonth() + 1).toString().padStart(2, '0')
            // const dateString = `${dayNumber}/${month}`

            return (
              <div key={index} className="border-r border-gray-200 last:border-r-0  relative">
                {/* {isToday(date) && (
                  <div className="h-1 w-4 rounded-lg bg-purple-500 absolute top-2 left-1/2 -translate-x-1/2"></div>
                )} */}
                <div
                  className={`flex items-center justify-center p-1 gap-2 text-center border-r border-gray-200 last:border-r-0 ${
                    isToday(date) ? 'text-purple-500' : 'text-gray-600'
                  }`}
                >
                  <div className="text-base">{dayName.slice(0, 3)}</div>
                  <div
                    className={cx(
                      `text-sm `,
                      isToday(date)
                        ? ' py-px px-1 rounded-md bg-purple-600 text-white'
                        : 'text-gray-600',
                    )}
                  >
                    {dayNumber}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Time Slots and Events */}
        <div
          className="grid  overflow-y-auto flex-1 relative"
          style={{ gridTemplateColumns: '120px repeat(7, 1fr)' }}
        >
          {/* {isCurrentWeek() && (
            <div
              className="absolute left-0 right-0 z-40 pointer-events-none"
              style={{
                top: `${getCurrentTimePosition()}rem`,
              }}
            >
              <div className="absolute left-0 -top-[11px] w-20 flex justify-end pr-2">
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-md shadow-sm font-semibold">
                  {currentTime.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </div>
              </div>

              <div className="ml-20 h-0.5 bg-purple-500 shadow-sm"></div>

              <div className="absolute left-[78px] top-0 w-2 h-2 bg-purple-500 rounded-full transform -translate-y-[3px]"></div>
            </div>
          )} */}
          {/* Time Column */}
          <div className="border-r border-gray-200 sticky left-0 z-20 bg-white">
            {timeSlots.map((time, timeIndex) => {
              const timeHour = timeIndex
              const isCurrentHour = isCurrentWeek() && timeHour === currentHour

              return (
                <div
                  key={time}
                  className="h-20 border-b border-gray-100 last:border-b-0 flex items-start justify-end pr-3 pt-2"
                >
                  <span
                    className={cx(
                      `text-xs`,
                      isCurrentHour ? 'text-purple-600 font-semibold' : 'text-gray-500 font-medium',
                    )}
                  >
                    {time}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Days Columns */}
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            // Generate recurring events for the current week
            const isCurrentDay = dayIndex === todayColumnIndex
            return (
              <div
                key={dayIndex}
                className="border-r border-gray-200 last:border-r-0 relative min-w-0 flex-1"
              >
                {isCurrentDay && (
                  <div
                    className="absolute left-0 right-0 z-40 pointer-events-none"
                    style={{
                      top: `${getCurrentTimePosition()}rem`,
                    }}
                  >
                    {/* Time indicator on the left */}

                    {/* Purple line across the current day column */}
                    <div className="h-0.5 bg-purple-500 shadow-sm rounded-sm"></div>
                    {/* Purple dot at the beginning of the line */}
                    {/* <div className="absolute -left-[2px] top-0 w-1 h-4 bg-purple-500 rounded-md transform -translate-y-[7px]"></div> */}
                  </div>
                )}
                {/* Time Slot Grid */}
                {timeSlots.map((_, timeIndex) => (
                  <div
                    key={timeIndex}
                    className="h-20 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  />
                ))}

                {/* Events */}
                {events
                  .filter((event) => isEventOnDate(event.date, weekDates[dayIndex]))
                  .map((event) => {
                    return <EventCard key={event.id} event={event} />
                  })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
