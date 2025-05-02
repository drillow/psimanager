import { formatCellphone } from "@/utils/masks/phone_mask"
import { DeletePatient } from "./DeletePatientButton"
import { EditPatientButton } from "./EditButtonPatient"
import { Badge } from "./ui/badge"
import { TableCell, TableRow } from "./ui/table"
import { PatientPayload } from "@/service/patient/service"
import { useState } from "react"

type PatientRowProps = {
  data: PatientPayload
}

export const PatientRow: React.FC<PatientRowProps> = ({ data }) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openRemoveModal, setOpenRemoveModal] = useState(false)

  const handleOpenEditModal = () => setOpenEditModal(prevState => !prevState)
  const handleOpenRemoveModal = () => setOpenRemoveModal(prevState => !prevState)

  return (
    <TableRow key={data.id}>
      <TableCell className='text-zinc-500 text-sm font-semibold w-[95px] antialiased'>{data.patientId}</TableCell>
      <TableCell className='text-zinc-700 text-sm font-bold antialiased w-[250px]'>{`${data.firstName} ${data.lastName}`}</TableCell>
      <TableCell className='text-zinc-500 text-sm font-semibold antialiased w-[175px]'>{data.age}</TableCell>
      <TableCell className='text-zinc-500 text-sm font-semibold antialiased'>{data.email}</TableCell>
      <TableCell className='text-zinc-500 text-sm font-semibold antialiased w-[275px]'>{formatCellphone(data.phoneNumber)}</TableCell>

      <TableCell className="text-center">
        {data.isWhatsApp ? (
          <Badge className="bg-green-100 text-green-600 hover:bg-green-100 rounded-md shadow-none antialiased">
            Sim
          </Badge>
        ) : (
          <Badge variant={'destructive'} className='bg-red-200 text-red-600 hover:bg-red-200 antialiased shadow-none'>Não</Badge>
        )}
      </TableCell>

      <TableCell className="text-right flex items-center justify-end gap-2">
        <EditPatientButton key={data.id} patientData={data} open={openEditModal} setOpen={handleOpenEditModal}/>
        <DeletePatient key={data.id} patientId={data.id!}  open={openRemoveModal}  setOpen={handleOpenRemoveModal}/>
      </TableCell>
    </TableRow>
  )
}