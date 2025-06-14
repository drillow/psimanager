import { EditPatientModal } from '@/pages/Patients/_components/EditButtonPatient'
import { Patients } from './TableColumns'
import { useState } from 'react'
import { Edit, Ellipsis, Info, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeletePatient } from '@/pages/Patients/_components/DeletePatientButton'
import { InfoPatient } from './InfoPatient'

interface ActionCellProps {
  data: Patients
}

export const ActionCell: React.FC<ActionCellProps> = ({ data }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)

  const handleOpenEditModal = () => setOpenEditModal((prevState) => !prevState)
  const handleOpenRemoveModal = () => setOpenRemoveModal((prevState) => !prevState)
  const handleOpenInfoModal = () => setOpenInfoModal((prevState) => !prevState)

  return (
    <div className="flex gap-2 items-center justify-end" key={data.id}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 py-1 rounded-xl transition-all ease-in-out hover:bg-zinc-200">
            <Ellipsis className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleOpenInfoModal}>
              <Info className="w-4 h-4" />
              Info
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenEditModal}>
              <Edit className="w-4 h-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-red-100 hover:text-red-600 text-red-500"
              onClick={handleOpenRemoveModal}
            >
              <Trash className="w-4 h-4" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <InfoPatient open={openInfoModal} onOpenChange={handleOpenInfoModal} patientData={data} />

      <EditPatientModal
        key={data.id}
        patientData={data}
        open={openEditModal}
        setOpen={handleOpenEditModal}
      />

      <DeletePatient
        key={data.id}
        patientId={data.id!}
        open={openRemoveModal}
        setOpen={handleOpenRemoveModal}
      />
    </div>
  )
}
