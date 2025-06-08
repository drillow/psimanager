import { AddPatientToCalendar } from '@/components/AddPatientToCalendar'
import { EmptyColumn } from '@/components/EmptyColumn'
import { PageHeader } from '@/components/PageHeader'
import { PatientCard, PatientType } from '@/components/ConsultCard'
import { ScrollDayColumn } from '@/components/ScrollDayColumn'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'
import { useAuth } from '@/context/auth'
import { useGetWeekConsults } from '@/service/consults/hooks'
import { cx } from 'class-variance-authority'
import { format, parseISO, addDays } from 'date-fns'
import { ChevronLeft, ChevronRight, PlusIcon } from 'lucide-react'

import { useEffect, useState } from 'react'
import { Toggle } from '@/components/ui/toggle'

import { CalendarEvent, WeekCalendar } from '@/components/WeekCalendar'

enum FilterOptions {
  ONLINE,
  IN_PERSON,
}

enum WeekDays {
  SEG = 'MO',
  TER = 'TU',
  QUA = 'WE',
  QUI = 'TH',
  SEX = 'FR',
  SAB = 'SA',
  DOM = 'SU',
}

type MockDataProps = {
  [key: string]: { name: string; time: string; type: 'ONLINE' | 'IN_PERSON' }[]
}

const Services = () => {
  const [isAddConsultModalOpen, setIsAddConsultModalOpen] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)
  const [patinents, setPatients] = useState<CalendarEvent[]>([])
  const [selectedFilter] = useState<FilterOptions | null>(null)
  const { setOpen } = useSidebar()
  const { user } = useAuth()
  const { data, isLoading } = useGetWeekConsults(user.id, weekOffset)

  const filterPatients = (data: MockDataProps, selectedFilter: FilterOptions | null) => {
    if (selectedFilter === null) {
      return data
    }

    const filteredData: MockDataProps = {}

    if (selectedFilter === FilterOptions.ONLINE) {
      for (const key in data) {
        filteredData[key] = data[key].filter((patient) => patient.type === 'ONLINE')
      }

      return filteredData
    }

    for (const key in data) {
      filteredData[key] = data[key].filter((patient) => patient.type === 'IN_PERSON')
    }

    return filteredData
  }

  useEffect(() => {
    if (data) {
      setPatients(data?.consults)
    }
  }, [data])

  useEffect(() => {
    setOpen(false)
  }, [])

  // useEffect(() => {
  //   if (patinents) {
  //     const filteredPatients = filterPatients(data?.consults, selectedFilter)
  //     setPatients(filteredPatients)
  //   }
  // }, [selectedFilter])

  const today = new Date()

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Consultas" hasToggleSidebar showCurrentDay />

      <div className="flex items-center justify-between">
        <div className="w-2/12 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Button variant={'outline'} onClick={() => setWeekOffset((prev) => prev - 1)}>
              <ChevronLeft />
            </Button>
            <Button variant={'outline'} onClick={() => setWeekOffset((prev) => prev + 1)}>
              <ChevronRight />
            </Button>
            <Button variant={'outline'} onClick={() => setWeekOffset(0)}>
              Hoje
            </Button>
          </div>
          {/* <div className="flex items-center gap-2">
            <Toggle variant={"outline"} value={FilterOptions.ONLINE} pressed={selectedFilter === FilterOptions.ONLINE} onPressedChange={() => toggleFilter(FilterOptions.ONLINE)}>Online</Toggle>
            <Toggle variant={"outline"} value={FilterOptions.IN_PERSON} pressed={selectedFilter === FilterOptions.IN_PERSON} onPressedChange={() => toggleFilter(FilterOptions.IN_PERSON)}>Presencial</Toggle>
          </div> */}
        </div>

        <Button type="button" onClick={() => setIsAddConsultModalOpen(true)}>
          <PlusIcon />
          Adicionar paciente
        </Button>
      </div>

      <WeekCalendar weekOffset={weekOffset} events={patinents} />

      {isAddConsultModalOpen && (
        <AddPatientToCalendar isOpen={isAddConsultModalOpen} setIsOpen={setIsAddConsultModalOpen} />
      )}
      {/* {} */}
    </div>
  )
}

export default Services
