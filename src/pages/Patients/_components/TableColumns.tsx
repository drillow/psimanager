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
  address?: string
  birth_date?: string
  cep?: string
  city?: string
  complement?: string
  country?: string
  neighborhood?: string
  number?: string
  state?: string
  takeMedication?: boolean
  medicationInfo?: string
  hadTherapyBefore?: boolean
}

// address: null
// birth_date: null
// cep: null
// city: null
// complement: null
// country: null
// createAt: '2025-07-05T01:15:12.489Z'
// deteledAt: null
// email: 'tamiresb.santos99@gmail.com'
// firstName: 'Tamires'
// first_name: 'Tamires'
// hadTherapyBefore: false
// id: '619dd750-de98-47eb-8028-b8a770d6ad49'
// isWhatsApp: true
// lastName: 'Brito dos Santos'
// last_name: 'Brito dos Santos'
// medicationInfo: null
// neighborhood: null
// number: null
// patientId: '#19'
// phoneNumber: '(71) 98364-2291'
// phone_number: '(71) 98364-2291'
// state: null
// takeMedication: false
// updatedAt: '2025-07-05T01:15:12.489Z'
// userId: '5b33c474-ff25-4e15-9327-fcc57cb7a207'

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
