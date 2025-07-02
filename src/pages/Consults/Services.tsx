import { AddPatientToCalendar } from '@/pages/Consults/_components/AddPatientToCalendar'

import { PageHeader } from '@/components/PageHeader'

import { Button } from '@/components/ui/button'

import { useSidebar } from '@/components/ui/sidebar'
import { useAuth } from '@/context/auth'
import { useGetWeekConsults } from '@/service/consults/hooks'

import { PlusIcon } from 'lucide-react'

import { useEffect, useState } from 'react'

import { CalendarEvent, WeekCalendar } from '@/pages/Consults/_components/WeekCalendar'

const Services = () => {
  const [isAddConsultModalOpen, setIsAddConsultModalOpen] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)
  const [patinents, setPatients] = useState<CalendarEvent[]>([])

  const { setOpen } = useSidebar()
  const { user } = useAuth()
  const { data } = useGetWeekConsults(user.id, weekOffset)

  useEffect(() => {
    if (data) {
      setPatients(data?.consults)
    }
  }, [data])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Consultas" hasToggleSidebar showCurrentDay />

      <div className="flex items-center justify-between">
        <div className="w-2/12 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Button variant={'outline'} onClick={() => setWeekOffset(0)}>
              Hoje
            </Button>
          </div>
        </div>

        <Button type="button" onClick={() => setIsAddConsultModalOpen(true)}>
          <PlusIcon />
          Adicionar consulta
        </Button>
      </div>

      {/* {isLoading && (
        <div className="flex items-center justify-center h-full absolute z-50 center-x center-y w-full ">
          <LoadingSpinner className="text-purple-500" />
          <span>Carregando...</span>
        </div>
      )} */}

      <WeekCalendar weekOffset={weekOffset} events={patinents} setWeekOffset={setWeekOffset} />

      {isAddConsultModalOpen && (
        <AddPatientToCalendar isOpen={isAddConsultModalOpen} setIsOpen={setIsAddConsultModalOpen} />
      )}
    </div>
  )
}

export default Services
