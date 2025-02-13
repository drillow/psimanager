import { Checkbox } from './ui/checkbox'
import { useState } from 'react'
import { CopyButton } from './CopyButton'
import { Badge } from './ui/badge'
import { Link, MapPin } from 'lucide-react'

interface CardProps {
  patient: {
    name: string
    time: string
    isOnline: boolean
  }
  isCompled?: boolean
}

export const Card: React.FC<CardProps> = ({ patient, isCompled = false }) => {
  const [isCompleted, setIsCompleted] = useState(isCompled)

  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col flex-1 max-h-[119px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => setIsCompleted(!isCompleted)}
          />
          <span
            className={`font-semibold text-sm ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-700'}`}
          >
            {patient.name}
          </span>
        </div>
        <span className="text-xs text-zinc-400">{patient.time}</span>
      </div>
      {patient.isOnline ? (
        <div className="py-4 flex items-center gap-2">
          <Link className="w-4 h-4 text-zinc-400" />
          <span
            className={`text-xs ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-400'}`}
          >
            https://meet.google.com/kjsdai1
          </span>
        </div>
      ) : (
        <div className="py-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-zinc-400" />
          <span
            className={`text-xs ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-400'}`}
          >
            Clinica AmorPsi
          </span>
        </div>
      )}
      <div className="flex justify-between items-center">
        {patient.isOnline ? (
          <Badge variant={'secondary'}>Online</Badge>
        ) : (
          <Badge variant={'outline'}>Presencial</Badge>
        )}
        {patient.isOnline && (
          <CopyButton
            disabled={isCompleted}
            copyText={'https://meet.google.com/kjsdai1'}
          />
        )}
      </div>
    </div>
  )
}
