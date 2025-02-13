import { AddPatientToCalendar } from "@/components/AddPatientToCalendar"
import { EmptyColumn } from "@/components/EmptyColumn"
import { PageHeader } from "@/components/PageHeader"
import { PatientCard } from "@/components/PatientCard"
import { ScrollDayColumn } from "@/components/ScrollDayColumn"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Toggle } from "@/components/ui/toggle"

import { useEffect, useState } from "react"

enum FilterOptions {
  ONLINE,
  LOCAL
}

enum WeekDays {
  SEG = "SEG",
  TER = "TER",
  QUA = "QUA",
  QUI = "QUI",
  SEX = "SEX",
  SAB = "SÁB",
  DOM = "DOM"
}

type MockDataProps = {
  [key: string]: { name: string, time: string, isOnline: boolean }[]
}

export const mockData: MockDataProps = {
  SEG: [
    {
      name: "Felipe Vieira",
      time: "11:00",
      isOnline: false
    },
    {
      name: "Felipe Vieira",
      time: "12:00",
      isOnline: false
    }
  ],
  TER: [
    { name: "Felipe Vieira", time: "11:00", isOnline: false },
    { name: "Felipe Vieira", time: "12:00", isOnline: true },
    { name: "Felipe Vieira", time: "13:00", isOnline: true },
    { name: "Felipe Vieira", time: "14:00", isOnline: false },
    { name: "Felipe Vieira", time: "15:00", isOnline: false }
  ],
  QUA: [
    { name: "Felipe Vieira", time: "11:00", isOnline: false },
    { name: "Felipe Vieira", time: "12:00", isOnline: true },
    { name: "Felipe Vieira", time: "13:00", isOnline: true },
    { name: "Felipe Vieira", time: "14:00", isOnline: false },
    { name: "Felipe Vieira", time: "15:00", isOnline: false },
    { name: "Felipe Vieira", time: "16:00", isOnline: true },
    { name: "Felipe Vieira", time: "17:00", isOnline: false }
  ],
  QUI: [
    { name: "Felipe Vieira", time: "11:00", isOnline: false },
  ],
  SEX: [
    { name: "Felipe Vieira", time: "11:00", isOnline: false },
    { name: "Felipe Vieira", time: "12:00", isOnline: true },
    { name: "Felipe Vieira", time: "13:00", isOnline: true },
    { name: "Felipe Vieira", time: "14:00", isOnline: false },
    { name: "Felipe Vieira", time: "15:00", isOnline: false },
    { name: "Felipe Vieira", time: "16:00", isOnline: true },
    { name: "Felipe Vieira", time: "17:00", isOnline: false },
    { name: "Felipe Vieira", time: "17:00", isOnline: false }
  ],
  SÁB: [
    { name: "Felipe Vieira", time: "11:00", isOnline: false },
    { name: "Felipe Vieira", time: "12:00", isOnline: true },
    { name: "Felipe Vieira", time: "13:00", isOnline: true },
  ],
  DOM: [],
}

export const Services = () => {
  const [patinents, setPatients] = useState(mockData)
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions | null>(null)
  const { setOpen } = useSidebar()

  const toggleFilter = (filterOption: FilterOptions) => {
    if (selectedFilter === filterOption) {
      return setSelectedFilter(null)
    }

    return setSelectedFilter(filterOption)
  }

  const filterPatients = (data: MockDataProps, selectedFilter: FilterOptions | null) => {
    if (selectedFilter === null) {
      return data
    }

    const filteredData: MockDataProps = {}
    
    if (selectedFilter === FilterOptions.ONLINE) {
      for (const key in data) {
        filteredData[key] = data[key].filter((patient) => patient.isOnline)
      }

      return filteredData
    }


    for (const key in data) {
      filteredData[key] = data[key].filter((patient) => !patient.isOnline)
    }

    return filteredData
      
  } 

  useEffect(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    const filteredPatients = filterPatients(mockData, selectedFilter)
    setPatients(filteredPatients)
  }, [selectedFilter])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Consultas" hasToggleSidebar showCurrentDay/>
      <div className="flex items-center justify-between">
        <div className="w-2/12 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Toggle variant={"outline"} value={FilterOptions.ONLINE} pressed={selectedFilter === FilterOptions.ONLINE} onPressedChange={() => toggleFilter(FilterOptions.ONLINE)}>Online</Toggle>
            <Toggle variant={"outline"} value={FilterOptions.LOCAL} pressed={selectedFilter === FilterOptions.LOCAL} onPressedChange={() => toggleFilter(FilterOptions.LOCAL)}>Presencial</Toggle>
          </div>
        </div>
        
        <AddPatientToCalendar />
      </div>
      <div className="bg-slate-100 rounded-xl flex w-12/12 h-full p-4 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Segunda</span>
          </div>
          <ScrollDayColumn>
            {patinents[WeekDays.SEG].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.SEG].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Terça</span>
          </div>
          <ScrollDayColumn>
            {patinents[WeekDays.TER].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.TER].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Quarta</span>
          </div>
          <ScrollDayColumn>
            {patinents[WeekDays.QUA].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.QUA].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Quinta</span>
          </div>
   
          <ScrollDayColumn>
            {patinents[WeekDays.QUI].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.QUI].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
  
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Sexta</span>
          </div>
          <ScrollDayColumn>
            {patinents[WeekDays.SEX].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.SEX].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Sabado</span>
          </div>
     
          <ScrollDayColumn>
            {patinents[WeekDays.SAB].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.SAB].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>

        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Domingo</span>
          </div>
          <ScrollDayColumn>
            {patinents[WeekDays.DOM].map((patient) => (
              <PatientCard patient={patient} />
            ))}
            {patinents[WeekDays.DOM].length === 0 && <EmptyColumn />}
          </ScrollDayColumn>
        </div>
      </div>
    </div>
  )
}