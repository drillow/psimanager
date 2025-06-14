import { CalendarEvent } from './WeekCalendar'
import { MapPin, Video } from 'lucide-react'

import { useState } from 'react'

import { EventDetailsSheet } from './EventDetailsSheet'
import { CompleteCheckbox } from './CompleteCheckbox'

interface EventCardProps {
  event: CalendarEvent
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [showEventDetails, setShowEventDetails] = useState(false)

  const parseName = (name: string) => {
    return name.split(' ').slice(0, 2).join(' ')
  }

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const getEventPosition = (event: CalendarEvent) => {
    const eventDate = new Date(event.date)
    const startHour = eventDate.getHours()
    const startMinute = eventDate.getMinutes()

    const durationInHours = event?.consultDuration / 60

    const startPosition = (startHour * 60 + startMinute) / 60

    return {
      top: `calc(${startPosition * 5}rem + 4px)`,
      height: `calc(${durationInHours * 5}rem - 9px)`,
    }
  }

  const handleOpenChange = () => {
    setShowEventDetails(!showEventDetails)
  }

  const position = getEventPosition(event)

  return (
    <>
      <div
        key={event.id}
        className={`animated-card flex flex-col justify-between absolute left-1 right-1 bg-purple-100 border border-purple-400 hover:border-purple-600 transition-all ease-in-out rounded-md p-2 text-xs font-medium shadow-sm cursor-pointer z-10 ${event.completed ? 'opacity-60' : ''}`}
        style={{
          top: position.top,
          height: position.height,
        }}
        onClick={handleOpenChange}
      >
        <div
          className={`flex ${event.consultDuration < 45 ? 'items-center' : 'items-start'} justify-between h-full`}
        >
          <div className="flex items-center gap-2">
            <CompleteCheckbox event={event} key={event.id} />
            <span
              className={`w-full font-semibold text-sm ${event.completed ? 'line-through text-zinc-500' : 'text-zinc-700'} truncate capitalize`}
            >
              {parseName(event.patientName).toLowerCase()}
            </span>
          </div>
          {event.consultDuration < 45 && (
            <span className="text-xs text-zinc-400 font-bold">{formatEventTime(event.date)}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {event.consultDuration > 45 && (
            <div className="flex items-center gap-1 text-purple-500 ">
              {event.type === 'IN_PERSON' ? (
                <MapPin className="h-3 w-3" />
              ) : (
                <Video className="h-3 w-3" />
              )}
              <span className="text-xs truncate capitalize">
                {event.type === 'IN_PERSON' ? event.place.toLowerCase() : 'Online'}
              </span>
            </div>
          )}
          {event.consultDuration >= 45 && (
            <span className="text-xs text-zinc-400 font-bold w-full flex justify-end">
              {formatEventTime(event.date)}
            </span>
          )}
        </div>
      </div>
      <EventDetailsSheet open={showEventDetails} onOpenChange={handleOpenChange} event={event} />
    </>
  )
}
