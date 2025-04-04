import { EditPatientButton } from '@/components/EditButtonPatient'
import { AddPatientButton } from '@/components/AddPatientButton'
import { PageHeader } from '@/components/PageHeader'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/context/auth'
import { useGetPatient } from '@/service/patient/hooks'
import { PatientPayload } from '@/service/patient/service'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { RocketIcon, X } from 'lucide-react'
import { useState } from 'react'
import { DeletePatient } from '@/components/DeletePatientButton'

export const Patients = () => {
  const { user } = useAuth()
  const { isLoading, data } = useGetPatient(user.id)
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
          <AddPatientButton />
        </div>
        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Tem WhatsApp?</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 8 }, (_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                      <TableCell className="flex justify-center">
                        <Skeleton className="h-6 w-3/12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </>
            ) : (
              <>
                {data?.map((data: PatientPayload) => (
                  <TableRow key={data.firstName}>
                    <TableCell>{`${data.firstName} ${data.lastName}`}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>
                    <TableCell>{data.email}</TableCell>

                    <TableCell className="text-center">
                      {data.isWhatsApp ? (
                        <Badge className="bg-green-600 hover:bg-green-500">
                          Sim
                        </Badge>
                      ) : (
                        <Badge variant={'destructive'}>Não</Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <EditPatientButton patientData={data} />
                      <DeletePatient patientId={data.id!} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {/* <Pagination>
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
        </Pagination> */}
      </div>
    </div>
  )
}
