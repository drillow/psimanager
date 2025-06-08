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

import { LayoutGrid, PlusIcon, Rows3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PatientRow } from '@/components/PatientRow'
import { SubscriptionStatus, useSubscriptionStatus } from '@/context/subscriptionStatus'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { PatientCard } from '@/components/PatientCard'

export const Patients = () => {
  const { user } = useAuth()
  const { isLoading, data } = useGetPatient(user.id)
  const { status } = useSubscriptionStatus()

  const [filteredList, setFilteredList] = useState([])
  const [filter, setFilter] = useState('')

  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setFilteredList(data)
    }
  }, [data])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Pacientes" />
      <div className="flex flex-col gap-4 border border-zinc-200 rounded-lg p-4 h-full">
        <Tabs defaultValue="list" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center w-2/12 flex-1">
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar por nome"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="pl-8 flex-1"
                />
              </div>

              <TabsList>
                <TabsTrigger value="list">
                  <Rows3 className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <LayoutGrid className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
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
          <TabsContent value="list">
            <Table>
              <TableHeader className="bg-gray-50">
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
                      <PatientRow data={data} key={data.id} />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="grid">
            <div className="grid grid-cols-4 gap-4">
              {filteredList?.map((data: PatientPayload) => (
                <PatientCard key={data.id} data={data} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
