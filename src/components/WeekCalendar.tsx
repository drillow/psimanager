import { MapPin, Video, User } from 'lucide-react'

export interface CalendarEvent {
  id: string
  patientName: string
  date: string // ISO datetime format: "2025-06-05T23:00:00.000Z"
  place: string
  type: 'IN_PERSON' | 'ONLINE'
  url: string | null
  completed: boolean
}

interface WeekCalendarProps {
  weekOffset: number
  events: CalendarEvent[]
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({ weekOffset, events }) => {
  // const [weekOffset, setWeekOffset] = useState(0)
  // const [events] = useState<CalendarEvent[]>(sampleEvents)

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

  const getEventPosition = (event: CalendarEvent) => {
    const eventDate = new Date(event.date)
    const startHour = eventDate.getHours()
    const startMinute = eventDate.getMinutes()

    // Use the duration from the event (30 or 60 minutes)
    const durationInHours = 1

    const startPosition = (startHour * 60 + startMinute) / 60

    return {
      top: `calc(${startPosition * 5}rem + 6px)`,
      height: `calc(${durationInHours * 5}rem - 12px)`,
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isEventOnDate = (eventDate: string, targetDate: Date) => {
    const event = new Date(eventDate)
    return event.toDateString() === targetDate.toDateString()
  }

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const getEventColor = (event: CalendarEvent) => {
    if (event.completed) {
      return 'bg-gray-400'
    }
    return event.type === 'IN_PERSON' ? 'bg-purple-100' : 'bg-green-100'
  }

  return (
    <div className="w-full bg-white">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-[calc(100vh-140px)]">
        <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 z-30 bg-white shadow-sm">
          <div className="p-4 bg-gray-50 border-r border-gray-200 "></div>
          {weekDates.map((date, index) => {
            const dayName = daysOfWeek[index]
            const dayNumber = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const dateString = `${dayNumber}/${month}`

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 text-center border-r border-gray-200 last:border-r-0 bg-gray-50 ${
                  isToday(date) ? 'text-purple-600 font-semibold' : 'text-gray-600 font-normal'
                }`}
              >
                <div className="text-sm ">{dayName}</div>
                <div className={`text-sm `}>{dateString}</div>
              </div>
            )
          })}
        </div>

        {/* Time Slots and Events */}
        <div className="grid grid-cols-8 overflow-y-auto flex-1">
          {/* Time Column */}
          <div className="border-r border-gray-200 sticky left-0 z-20 bg-white">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-20 border-b border-gray-100 last:border-b-0 flex items-start justify-end pr-3 pt-2"
              >
                <span className="text-xs text-gray-500 font-medium">{time}</span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            // Generate recurring events for the current week

            return (
              <div
                key={dayIndex}
                className="border-r border-gray-200 last:border-r-0 relative min-w-0 flex-1"
              >
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
                    const position = getEventPosition(event)
                    const isRecurring = event.id.includes('recurring')
                    const eventColor = getEventColor(event)

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1 right-1 ${eventColor} text-blue-600 rounded-md p-2 text-xs font-medium shadow-sm cursor-pointer z-10 ${
                          isRecurring ? 'border-2 border-white border-dashed' : ''
                        } ${event.completed ? 'opacity-60' : ''}`}
                        style={{
                          top: position.top,
                          height: position.height,
                          minHeight: '3rem',
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <User className="h-3 w-3" />
                          <span className="truncate font-semibold">{event.patientName}</span>
                          {isRecurring && <span className="ml-1">🔄</span>}
                          {event.completed && <span className="ml-1">✓</span>}
                        </div>

                        <div className="flex items-center gap-1 mb-1">
                          {event.type === 'IN_PERSON' ? (
                            <MapPin className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                          <span className="text-xs truncate">{event.place}</span>
                        </div>

                        <div className="text-xs opacity-90">{formatEventTime(event.date)}</div>
                      </div>
                    )
                  })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
