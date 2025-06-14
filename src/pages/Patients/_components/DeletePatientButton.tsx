import { Button } from '../../../components/ui/button'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { useDeletePatient } from '@/service/patient/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/auth'

import { QueryKeys } from '@/utils/queryKeys'

interface DeletePatientProps {
  patientId: string
  open: boolean
  setOpen: () => void
}

export const DeletePatient: React.FC<DeletePatientProps> = ({ patientId, open, setOpen }) => {
  // const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const { execute, isLoading: isLoadingDeletePatient } = useDeletePatient(user.id, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.PATIENT.LIST,
    })
    setOpen()
  })

  return (
    <Dialog open={open} onOpenChange={setOpen} modal key={'remove-modal'}>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Remover paciente</DialogTitle>
          <DialogDescription>
            Ao deletar o paciente, todas as futuras consultas serão removidas do calendário
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
