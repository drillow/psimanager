import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { ActionCell } from './ActionCell'

export type Patients = {
  age: number
  createAt: string
  deteledAt?: string
  email: string
  firstName: string
  first_name: string
  id: string
  isWhatsApp: boolean
  lastName: string
  last_name: string
  patientId: string
  phoneNumber: string
  phone_number: string
  updatedAt: string
  userId: string
}
export const columns: ColumnDef<Patients>[] = [
  {
    accessorKey: 'patientId',
    header: 'ID',
    cell: ({ row }) => {
      const patientId = row.getValue('patientId') as string
      return <div className="text-zinc-500 text-sm font-semibold w-[20px]">{patientId}</div>
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Nome',
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.original.lastName
      return <div className="capitalize">{`${firstName} ${lastName}`.toLowerCase()}</div>
    },
  },
  {
    accessorKey: 'age',
    header: 'Idade',
    cell: ({ row }) => {
      const age = row.getValue('age') as number
      return age ? `${age} anos` : 'N/A'
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Telefone',
    cell: ({ row }) => {
      const phoneNumber = row.getValue('phoneNumber') as string
      if (!phoneNumber) return ''

      const cleaned = phoneNumber.replace(/\D/g, '')
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`
      }
      return phoneNumber
    },
  },
  {
    accessorKey: 'isWhatsApp',
    header: 'WhatsApp',
    cell: ({ row }) => {
      const isWhatsApp = row.getValue('isWhatsApp') as boolean
      return (
        <Badge
          className={`${
            isWhatsApp ? 'bg-green-100 text-green-600' : 'bg-red-200 text-red-600'
          } hover:bg-opacity-90 rounded-md shadow-none antialiased`}
        >
          {isWhatsApp ? 'Sim' : 'Não'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return <ActionCell data={row.original} key={row.original.id} />
    },
  },
]
