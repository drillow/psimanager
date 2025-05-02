import { Edit, Link, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { DeleteConsult } from './DeleteConsult'
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { useToggleConsultStatus } from '@/service/consults/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/utils/queryKeys'
import { cx } from 'class-variance-authority'
import { CopyButton } from './CopyButton'
import { EditConsultModal } from './EditConsultModal'

interface PatientCardProps {
  patient: {
    patientName: string
    endTime: string
    place?: string
    type: 'IN_PERSON' | 'ONLINE'
    url?: string
    id: string
    date: string
    completed: boolean
    consultValue: number
  }
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const { execute, isLoading } = useToggleConsultStatus(() => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.CONSULTS.DEFAULT
    })
  })

  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={patient.completed} onCheckedChange={() => execute(patient.id)} disabled={isLoading}/>
          <span className={cx('font-semibold text-sm', patient.completed ? 'line-through text-zinc-400' : 'text-zinc-700')}>
            {patient.patientName}
          </span>
        </div>
        <span className="text-xs text-zinc-400">
          {format(
            toZonedTime(parseISO(patient?.date), 'UTC'),
            'HH:mm',
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {patient.type === 'ONLINE' ? (
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-zinc-400" />
            <a
              className={cx(`text-xs  underline underline-offset-1`, patient.completed ? 'text-zinc-400' : 'text-violet-400')}
              href={patient.completed ? undefined : patient.url}
            >
              Link da consulta
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
          {!patient.completed && (
            <Edit className="w-4 h-4 text-zinc-500 cursor-pointer" onClick={() => setIsEditModalOpen(prevState => !prevState)} />
          )}
          {patient.type === 'ONLINE' && patient.url && (
            <CopyButton disabled={patient.completed} copyText={patient.url}/>
            // <Copy className={cx(`w-4 h-4`, patient.completed ? 'text-zinc-400' : 'cursor-pointer text-violet-500')} />
          )}
          <DeleteConsult
            consultId={patient.id}
            patientName={patient.patientName}
            isOpen={isRemoveModalOpen}
            onSetOpen={() => setIsRemoveModalOpen((prevState) => !prevState)}
            consultDate={patient.date}
          />
          <EditConsultModal 
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            consultData={patient}
          />
        </div>
      </div>
    </div>
  )
}
