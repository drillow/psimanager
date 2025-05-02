import { AddPatientButton } from '@/components/AddPatientButton'
import { PageHeader } from '@/components/PageHeader'
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

import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PatientRow } from '@/components/PatientRow'
import { SubscriptionStatus, useSubscriptionStatus } from '@/context/subscriptionStatus'

export const Patients = () => {
  const { user } = useAuth()
  const { isLoading, data } = useGetPatient(user.id)
  const { status } = useSubscriptionStatus()

  const [filteredList, setFilteredList] = useState([])
  const [filter, setFilter] = useState("")

  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)


  // const handleFilter = (value: string) => {
  //   if (value === "") { 
  //     return setFilteredList(data)
  //   }

  //   const filterList = data.filter(item => item.firstName.includes(value))
  //   return setFilteredList(filterList)
  // } 

  useEffect(() => {
    if (data) {
      setFilteredList(data)
    }
  }, [data])

  // useEffect(() => {
  //   handleFilter(filter)
  // }, [filter])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Pacientes" />
      {/* {isFirstTime && (
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
      )} */}
      <div className="flex flex-col gap-4 border border-zinc-200 rounded-lg p-4 h-full">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center w-2/12">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Buscar por nome"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            type="button"
            onClick={() => setIsAddPatientModalOpen((prevState) => !prevState)}
            disabled={filteredList.length === 5 && status === SubscriptionStatus.INACTIVE}
          >
            <PlusIcon />
            Adicionar paciente
          </Button>
          {isAddPatientModalOpen && (
            <AddPatientButton
              isOpen={isAddPatientModalOpen}
              setIsOpen={setIsAddPatientModalOpen}
            />
          )}
        </div>
        <Table>
          <TableHeader className='bg-gray-50'>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead className="text-center">WhatsApp</TableHead>
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
                {filteredList?.map((data: PatientPayload) => (
                  <PatientRow data={data} key={data.id}/>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#">Voltar</PaginationPrevious>
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
