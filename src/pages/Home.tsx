import { Card } from "@/components/Card"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { WidgetCardLink } from "@/components/WidgetCardLink"
import { format, isBefore, parseISO } from 'date-fns'
import { Ellipsis, UserPlus2, Crown } from 'lucide-react'
import { Link } from "react-router-dom"

const meetings = [
  {
    date: "2024-10-27",
    patients: [
      {
        name: "John Doe",
        time: "10:00",
      },
      {
        name: "Jane Doe",
        time: "11:00",
      },
    ]
  },
  {
    date: "2024-10-28",
    patients: [
      {
        name: "John Doe",
        time: "10:00",
      },
      {
        name: "Jane Doe",
        time: "11:00",
      },
      {
        name: "Jane Doe",
        time: "12:00",
      },
      {
        name: "Felipe Vieira Lima",
        time: "14:00"
      }
    ]
  },
  {
    date: "2024-10-29",
    patients: [
      {
        name: "John Doe",
        time: "10:00",
      },
      {
        name: "Jane Doe",
        time: "11:00",
      },
    ]
  }
]

export const Home = () => {
  const meetingIsCompleted = (day: string, hour: string) => {
    return isBefore(parseISO(`${day}T${hour}`), new Date())
  }

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Dashboard"/>
      
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start gap-4">
          <div className="bg-slate-100 rounded-xl flex w-7/12 h-full p-4 gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-400">Hoje</span>
                <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span>
              </div>
              <div className="flex flex-col gap-2">
                {meetings[0].patients.map((patient) => (
                  <Card patient={patient} isCompled={meetingIsCompleted(meetings[0].date, patient.time)}/>
                ))}
              </div>
            </div>
            <Separator orientation="vertical"/>
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-400">Amanhã</span>
                <span className="font-semibold text-xs text-zinc-700">{format(meetings[1].date, 'do MMM')}</span>
              </div>
              <div className="flex flex-col gap-2">
                {meetings[1].patients.map((patient) => (
                  <Card patient={patient} isCompled={meetingIsCompleted(meetings[1].date, patient.time)}/>
                ))}
                
                <Button variant={"link"} asChild>
                  <Link to="/weekly-consults">
                    <Ellipsis />
                  </Link>
                </Button>
              </div>
            </div>
            <Separator orientation="vertical"/>
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-400">Em 2 dias</span>
                <span className="font-semibold text-xs text-zinc-700">{format(meetings[2].date, 'do MMM')}</span>
              </div>
              <div className="flex flex-col gap-2">
                {meetings[2].patients.map((patient) => (
                  <Card patient={patient} isCompled={meetingIsCompleted(meetings[2].date, patient.time)}/>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl flex w-5/12 h-full p-4 gap-4 border border-zinc-200">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-zinc-700">Métricas</h2>
              <span className="text-xs text-zinc-300">Uma visão geral dos seus atendimentos</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-full">
          <WidgetCardLink 
            title="Adicionar paciente" 
            description="Inclua um novo paciente, gerencie os dias da consulta e muito mais."
            icon={<UserPlus2 className="w-8 h-8"/>}
            toPath="/patients"
          />
          <WidgetCardLink 
            title="Gerenciar plano" 
            description="Genrencie seu plano e verifique sua assinatura"
            icon={<Crown className="w-8 h-8"/>}
            hasBadge
            badgeText="Plano gratuíto"
            toPath="/plan"
          />
          <div className="border border-zinc-200 rounded-xl w-full h-full p-4 col-start-3 col-end-5 bg-zinc-100">
            <span>Ainda pensando o que pode ser aqui</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// billing