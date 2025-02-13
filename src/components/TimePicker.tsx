import { useRef } from 'react'
import { TimePickerInput } from './time-picker'
import { Label } from './ui/label'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}
export const TimePicker: React.FC<TimePickerProps> = ({ date, setDate }) => {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-start">
        <Label htmlFor="hours" className="text-xs">
          Hora
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-start">
        <Label htmlFor="minutes" className="text-xs">
          Minutos
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  )
}
