import { Copy, Trash, Edit, Link, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'

interface PatientCardProps {
  patient: {
    name: string
    time: string
    isOnline: boolean
  }
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-sm text-zinc-700`}>
            {patient.name}
          </span>
        </div>
        <span className="text-xs text-zinc-400">{patient.time}</span>
      </div>

      <div className="flex items-center gap-2">
        {patient.isOnline ? (
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-zinc-400" />
            <span
              className={`text-xs text-zinc-400 w-[150px] overflow-hidden text-ellipsis`}
            >
              https://meet.google.com/kjsdai1
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span className={`text-xs text-zinc-400`}>Clinica AmorPsi</span>
          </div>
        )}
      </div>

      <div className="w-full flex justify-between">
        {patient.isOnline ? (
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
