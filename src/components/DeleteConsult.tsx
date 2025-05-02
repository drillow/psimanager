import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useDeleteConsult } from '@/service/consults/hooks'
import { Checkbox } from './ui/checkbox'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { QueryKeys } from '@/utils/queryKeys'

export interface DeleteConsultProps {
  consultId: string
  patientName: string
  consultDate: string
  isOpen: boolean
  onSetOpen: (data: boolean) => void
}

export const DeleteConsult: React.FC<DeleteConsultProps> = ({
  consultId,
  patientName,
  isOpen,
  onSetOpen,
  consultDate,
}) => {
  const [removeAllNextConsults, setRemoveAllNextConsults] = useState(false)
  const queryClient = useQueryClient()

  const { execute } = useDeleteConsult(() => {
    onSetOpen(false)
    queryClient.invalidateQueries({
      queryKey: QueryKeys.CONSULTS.DEFAULT,
    })
  })

  return (
    <Dialog modal open={isOpen} onOpenChange={onSetOpen}>
      <DialogTrigger asChild>
        <Trash className={`w-4 h-4 text-red-400 cursor-pointer`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover consulta</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-zinc-600 text-sm">
            Deseja remover a consulta com <strong>{patientName}</strong>, no dia{' '}
            <strong>{format(parseISO(consultDate), 'dd/MM')}</strong> às{' '}
            <strong>{format(parseISO(consultDate), 'hh:mm')}</strong>?
          </p>
          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="terms"
              checked={removeAllNextConsults}
              onCheckedChange={() =>
                setRemoveAllNextConsults((prevState) => !prevState)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remover as próximas consultas desse paciente
            </label>
          </div>
          <div className="flex items-center gap-4 w-full">
            <Button
              variant={'outline'}
              type="button"
              className="w-full"
              onClick={() => onSetOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => execute({ consultId, removeAllNextConsults })}
              className="w-full"
            >
              Remover
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
