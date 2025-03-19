import { AddPatientToCalendar } from "@/components/AddPatientToCalendar"
import { EmptyColumn } from "@/components/EmptyColumn"
import { PageHeader } from "@/components/PageHeader"
import { PatientCard } from "@/components/PatientCard"
import { ScrollDayColumn } from "@/components/ScrollDayColumn"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Toggle } from "@/components/ui/toggle"
import { useAuth } from "@/context/auth"
import { useGetWeekConsults } from "@/service/consults/hooks"
import { cx } from "class-variance-authority"
import { format, parseISO, addDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useEffect, useState } from "react"

enum FilterOptions {
  ONLINE,
  IN_PERSON
}

enum WeekDays {
  SEG = "MO",
  TER = "TU",
  QUA = "WE",
  QUI = "TH",
  SEX = "FR",
  SAB = "SA",
  DOM = "SU"
}

type MockDataProps = {
  [key: string]: { name: string, time: string, type: "ONLINE" | "IN_PERSON" }[]
}

const Services = () => {
  const [weekOffset, setWeekOffset] = useState(0)
  const [patinents, setPatients] = useState<{ [key: PropertyKey]: any[]  }>()
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions | null>(null)
  const { setOpen } = useSidebar()
  const { user } = useAuth()
  const { data, isLoading } = useGetWeekConsults(user.id, weekOffset)

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
        filteredData[key] = data[key].filter((patient) => patient.type === "ONLINE")
      }

      return filteredData
    }


    for (const key in data) {
      filteredData[key] = data[key].filter((patient) => patient.type === "IN_PERSON")
    }

    return filteredData
      
  } 

  useEffect(() => {
    if(data) {
      setPatients(data?.consults)
    }
  }, [data])

  useEffect(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (patinents) {
      const filteredPatients = filterPatients(data?.consults, selectedFilter)
      setPatients(filteredPatients)
    }
  }, [selectedFilter])

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Consultas" hasToggleSidebar showCurrentDay/>
      <div className="flex items-center justify-between">
        <div className="w-2/12 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Button variant={"outline"} onClick={() => setWeekOffset((prev) => prev - 1)}><ChevronLeft /></Button>
            <Button variant={"outline"} onClick={() => setWeekOffset((prev) => prev + 1)}><ChevronRight /></Button>
          </div>
          {/* <div className="flex items-center gap-2">
            <Toggle variant={"outline"} value={FilterOptions.ONLINE} pressed={selectedFilter === FilterOptions.ONLINE} onPressedChange={() => toggleFilter(FilterOptions.ONLINE)}>Online</Toggle>
            <Toggle variant={"outline"} value={FilterOptions.IN_PERSON} pressed={selectedFilter === FilterOptions.IN_PERSON} onPressedChange={() => toggleFilter(FilterOptions.IN_PERSON)}>Presencial</Toggle>
          </div> */}
        </div>
        
        <AddPatientToCalendar />
      </div>
      <div className="bg-slate-100 rounded-xl flex w-12/12 h-full p-4 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
          <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(parseISO(data?.startDate), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>Segunda</span>
            <span className="text-sm text-zinc-400">{data && format(parseISO(data?.startDate), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.SEG].map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.SEG].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
          <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 1), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>Terça</span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 1), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.TER]?.map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.TER]?.length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Quarta</span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 2), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.QUA].map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.QUA].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
          <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 3), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>Quinta</span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 3), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.QUI].map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.QUI].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 4), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>
              Sexta
              {/* {data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 4), 'dd/MM') && <div className="h-2 w-2 bg-violet-500 rounded-full"></div>} */}
            </span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 4), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.SEX].map((patient: any) => (
                <PatientCard patient={patient} />
              
              ))}
              {patinents && patinents[WeekDays.SEX].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
          
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
          <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 5), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>Sabado</span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 5), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.SAB].map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.SAB].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
          <span className={
              cx(
                "text-sm font-semibold ",
                data && format(new Date(), 'dd/MM') === format(addDays(parseISO(data?.startDate), 6), 'dd/MM') ? "text-violet-500" : "text-zinc-400"
              )
            }>Domingo</span>
            <span className="text-sm text-zinc-400">{data && format(addDays(parseISO(data?.startDate), 6), 'dd/MM')}</span>
          </div>
          {!isLoading ? (
            <ScrollDayColumn>
              {patinents && patinents[WeekDays.DOM].map((patient: any) => (
                <PatientCard patient={patient} />
              ))}
              {patinents && patinents[WeekDays.DOM].length === 0 && <EmptyColumn />}
            </ScrollDayColumn>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services