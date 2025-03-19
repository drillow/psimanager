import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { WidgetCardLink } from '@/components/WidgetCardLink'
import {
  UserPlus2,
  Crown,
  Settings as SettingsIcon,
  ChartColumnBig,
  Eye,
  EyeOff,
} from 'lucide-react'
import { MainChart } from '@/components/MainChart'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DashboardCalendar } from '@/components/DashboadCalendar'
import { MenuItens, Settings } from './Settings'

// import { datetime, RRule } from 'rrule'

export const Home = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(true)

  const handleAmountVisibility = () =>
    setIsAmountVisible((prevState) => !prevState)

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Dashboard" />

      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-1 h-full items-start gap-4">
          <DashboardCalendar />
          <div className="bg-white rounded-xl w-5/12 h-full p-4 border border-zinc-200 relative">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-white rounded-md p-2">
              Em breve
            </p>
            <div className="flex flex-col gap-10 blur-lg">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-zinc-700">
                    Métricas
                  </h2>
                  <span className="text-xs text-zinc-400">
                    Uma visão geral dos seus atendimentos
                  </span>
                </div>
                <Button variant={'outline'} onClick={handleAmountVisibility}>
                  {isAmountVisible ? <Eye /> : <EyeOff />}
                </Button>
              </div>

              <MainChart isHiddenValues={!isAmountVisible} />

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center w-full gap-2">
                  <h2 className="text-sm text-zinc-700">Consultas no mês</h2>
                  {isAmountVisible ? (
                    <strong className="text-3xl font-semibold flex items-start gap-2">
                      120
                    </strong>
                  ) : (
                    <div className="bg-zinc-300 h-9 w-4/12 rounded-md" />
                  )}
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    {isAmountVisible ? (
                      <strong className="text-red-500 flex items-center gap-2">
                        20%
                      </strong>
                    ) : (
                      <div className="w-7 h-4 bg-zinc-300 rounded-sm" />
                    )}
                    a menos que o último mês
                  </span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col items-center w-full gap-2">
                  <h2 className="text-sm text-zinc-700">
                    Faturamento estimado
                  </h2>
                  {isAmountVisible ? (
                    <strong className="text-3xl font-semibold">
                      R$ 12.000
                    </strong>
                  ) : (
                    <div className="bg-zinc-300 h-9 w-7/12 rounded-md" />
                  )}
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    {isAmountVisible ? (
                      <strong className="text-green-500">20%</strong>
                    ) : (
                      <div className="w-7 h-4 bg-zinc-300 rounded-sm" />
                    )}
                    a mais que o último mês
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <WidgetCardLink
            title="Adicionar paciente"
            description="Inclua um novo paciente, gerencie os dias da consulta e muito mais."
            icon={<UserPlus2 className="w-8 h-8" />}
            toPath="/patients"
          />
          <Settings openScreen={MenuItens.FINANCE}>
            <WidgetCardLink
              title="Gerenciar plano"
              description="Genrencie seu plano e verifique sua assinatura"
              icon={<Crown className="w-8 h-8" />}
              hasBadge
              badgeText="Plano gratuíto"
              // toPath="/plan"
            />
          </Settings>

          <WidgetCardLink
            title="Métricas"
            description="Veja total de consultas online e presencial, faturamento e outros."
            icon={<ChartColumnBig className="w-8 h-8" />}
            toPath="/settings"
          />
          <Settings openScreen={MenuItens.USER}>
            <WidgetCardLink
              title="Configurações"
              description="Configure seu perfil, notificações e muito mais."
              icon={<SettingsIcon className="w-8 h-8" />}
            />
          </Settings>
        </div>
      </div>
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bem vindo!</DialogTitle>
            <DialogDescription>
              Vamos completar seu cadastro com alguns dados importantes!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value=""
                placeholder="Nome completo do paciente"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 w-full">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="email"
                  value=""
                  placeholder="umemail@email.com"
                  disabled
                />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <Label htmlFor="cellphone" className="text-right">
                  Celular
                </Label>
                <Input id="cellphone" value="" placeholder="(11) 11111-1111" />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <Label htmlFor="cpf" className="text-right">
                  CPF
                </Label>
                <Input id="cpf" value="" placeholder="111.111.111-11" />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <Label htmlFor="crp" className="text-right">
                  CRP
                </Label>
                <Input id="crp" value="" placeholder="CRP-12312" />
              </div>
            </div>
          </div>
          <Button>Salvar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// billing
