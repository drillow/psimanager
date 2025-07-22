import { useEffect, useState } from 'react'
import { AddPatientButton } from '@/pages/Patients/_components/AddPatientButton'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useAuth } from '@/context/auth'
import { useGetPatient } from '@/service/patient/hooks'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { ChevronLeft, ChevronRight, LayoutGrid, PlusIcon, Rows3 } from 'lucide-react'
import { SubscriptionStatus, useSubscriptionStatus } from '@/context/subscriptionStatus'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { PatientCard } from '@/pages/Patients/_components/PatientCard'
import { DataTable } from '@/components/ui/data-table'
import { columns, Patients } from './_components/TableColumns'

const ITENS_PER_PAGE = 15

export const PatientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuth()
  const { data } = useGetPatient(user.id, currentPage)
  const { status } = useSubscriptionStatus()

  const [filteredList, setFilteredList] = useState([])
  const [filter, setFilter] = useState('')

  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data?.total / ITENS_PER_PAGE)) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (data) {
      setFilteredList(data?.data)
    }
  }, [data])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Pacientes" />
      <div className="flex flex-col gap-4  h-full">
        <Tabs defaultValue="grid" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center w-4/12 flex-1">
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar por nome"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="pl-8 flex-1 w-[250px]"
                />
              </div>

              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <Rows3 className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </div>
            <Button
              type="button"
              onClick={() => setIsAddPatientModalOpen((prevState) => !prevState)}
              disabled={filteredList?.length === 5 && status === SubscriptionStatus.INACTIVE}
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
            <DataTable columns={columns} data={filteredList} />
          </TabsContent>
          <TabsContent value="grid">
            <div className="grid grid-cols-4 gap-4">
              {filteredList?.map((data: Patients) => <PatientCard key={data.id} data={data} />)}
            </div>
          </TabsContent>
          <div className="flex items-center justify-center  gap-4">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="border boder-zinc-300 rounded-md p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-16 text-center text-sm font-medium text-zinc-500">
              {currentPage} of {Math.ceil(data?.total / ITENS_PER_PAGE)}
            </span>
            <button
              disabled={currentPage === Math.ceil(data?.total / ITENS_PER_PAGE)}
              onClick={handleNextPage}
              className="border boder-zinc-300 rounded-md p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
