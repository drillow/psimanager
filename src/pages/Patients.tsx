import { CreateUserButton } from '@/components/CreateUserButton'
import { PageHeader } from '@/components/PageHeader'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { PencilIcon, RocketIcon, X } from 'lucide-react'
import { useState } from 'react'

const mockData = [
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: false,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: false,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
  {
    name: 'Felipe Vieira Lima',
    cellphone: '(11) 99999-9999',
    hasWhatsApp: true,
    weekDay: 'SEG',
    hour: '19:00',
    everyWeek: true,
  },
]

export const Patients = () => {
  const [isFirstTime, setIsFFirstTime] = useState(true)

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Pacientes" />
      {isFirstTime && (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            Vamos adicionar pacientes
            <Button
              variant={'ghost'}
              onClick={() => setIsFFirstTime(false)}
              asChild
            >
              <div className="w-8 h-6 absolute top-0 right-1 cursor-pointer">
                <X className="h-4 w-4" />
              </div>
            </Button>
          </AlertTitle>
          <AlertDescription>
            Aqui você pode adicionar seus pacientes, podendo dizer os dias,
            horarios e se tem recorrencia.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-2 border border-zinc-200 rounded-lg p-4 h-full">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center w-2/12">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Buscar por nome"
              // value={search}
              // onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
          </div>
          <CreateUserButton />
        </div>
        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead className="text-center">Dia da semana</TableHead>
            <TableHead className="text-center">Horario</TableHead>
            <TableHead className="text-center">Tem WhatsApp?</TableHead>
            <TableHead className="text-center">É recorrente</TableHead>
            <TableHead>Ações</TableHead>
          </TableHeader>
          <TableBody>
            {mockData.map((data) => (
              <TableRow key={data.name}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.cellphone}</TableCell>
                <TableCell className="text-center">{data.weekDay}</TableCell>
                <TableCell className="text-center">{data.hour}</TableCell>
                <TableCell className="text-center">
                  {data.hasWhatsApp ? (
                    <Badge className="bg-green-600 hover:bg-green-500">
                      Sim
                    </Badge>
                  ) : (
                    <Badge variant={'destructive'}>Não</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {data.everyWeek ? 'Sim' : 'Não'}
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'}>
                    <PencilIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
