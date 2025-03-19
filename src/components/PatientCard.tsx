import { Copy, Trash, Edit, Link, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { Checkbox } from './ui/checkbox'

interface PatientCardProps {
  patient: {
    patientName: string
    endTime: string
    place?: string
    type: 'IN_PERSON' | 'ONLINE'
    url?: string
    id: string
    date: string
    completed: false
  }
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={false} onCheckedChange={() => null} />
          <span className={`font-semibold text-sm text-zinc-700`}>
            {patient.patientName}
          </span>
        </div>
        <span className="text-xs text-zinc-400">
          {format(toZonedTime(parseISO(patient?.date), 'UTC'), 'HH:mm')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {patient.type === 'ONLINE' ? (
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-zinc-400" />
            <a
              className={`text-xs text-violet-400 underline underline-offset-1`}
              href={patient.url}
            >
              Google Meet Link
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span className={`text-xs text-zinc-400`}>{patient.place}</span>
          </div>
        )}
      </div>

      <div className="w-full flex justify-between">
        {patient.type === 'ONLINE' ? (
          <Badge variant={'default'}>Online</Badge>
        ) : (
          <Badge variant={'secondary'}>Presencial</Badge>
        )}
        <div className="flex items-center gap-2">
          <Edit className="w-4 h-4 text-zinc-500 cursor-pointer" />
          <Copy className={`w-4 h-4 text-violet-400 cursor-pointer`} />
          <Trash className={`w-4 h-4 text-red-400 cursor-pointer`} />
        </div>
      </div>
    </div>
  )
}
