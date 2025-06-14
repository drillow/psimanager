import { Checkbox } from './ui/checkbox'

import { CopyButton } from './CopyButton'
import { Badge } from './ui/badge'
import { Link, MapPin } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useToggleConsultStatus } from '@/service/consults/hooks'
import { QueryKeys } from '@/utils/queryKeys'

interface CardProps {
  patient: {
    id: string
    name: string
    time: string
    isOnline: boolean
    url?: string
    place?: string
  }
  isCompleted?: boolean
}

export const Card: React.FC<CardProps> = ({ patient, isCompleted = false }) => {
  const queryClient = useQueryClient()

  const { execute, isLoading } = useToggleConsultStatus(() => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.CONSULTS.NEXT_TREE_DAYS,
    })
  })

  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col flex-1 justify-between h-[119px] max-h-[119px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => execute(patient.id)}
            disabled={isLoading}
          />
          <span
            className={`capitalize font-semibold text-sm ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-700'}`}
          >
            {patient.name}
          </span>
        </div>
        <span className="text-xs text-zinc-400">{patient.time}</span>
      </div>
      {patient.isOnline ? (
        <div className="flex items-center gap-2">
          <Link className="w-4 h-4 text-zinc-400" />
          <a
            className={`text-xs ${isCompleted ? 'line-through text-zinc-300' : 'text-violet-400 underline underline-offset-1'}`}
            href={patient.url}
          >
            Link da consulta
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2">
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
        {patient.isOnline && patient.url && (
          <CopyButton disabled={isCompleted} copyText={patient.url} />
        )}
      </div>
    </div>
  )
}
