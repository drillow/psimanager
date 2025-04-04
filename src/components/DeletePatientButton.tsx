import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useState } from 'react'
import { useDeletePatient } from '@/service/patient/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/auth'

interface DeletePatientProps {
  patientId: string
}

export const DeletePatient: React.FC<DeletePatientProps> = ({ patientId }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const { execute, isLoading: isLoadingDeletePatient } = useDeletePatient(
    user.id,
    () => {
      queryClient.invalidateQueries({
        queryKey: ['PATIENT_LIST'],
      })
      setOpen(false)
    },
  )

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant={'ghost'} onClick={() => setOpen(true)}>
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Remover paciente</DialogTitle>
          <DialogDescription>
            Ao deletar o paciente, todas as futuras consultas serão removidas do
            calendário
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant={'outline'} className="w-3/12">
              Cancelar
            </Button>
          </DialogTrigger>
          <Button
            variant={'destructive'}
            className="w-3/12"
            disabled={isLoadingDeletePatient}
            onClick={() => execute(patientId)}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
