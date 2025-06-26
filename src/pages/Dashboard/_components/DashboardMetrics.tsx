import { MainChart } from '@/pages/Dashboard/_components/MainChart'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useGetGraphData } from '@/service/consults/hooks'
import { useAuth } from '@/context/auth'

export const DashboardMetrics = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(true)
  const { user } = useAuth()
  const { data, isLoading } = useGetGraphData(user.id)
  console.log(data)
  const handleAmountVisibility = () => {
    setIsAmountVisible((prev) => !prev)
  }

  return (
    <div className="bg-white rounded-xl p-0 border h-full border-zinc-200 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-10 w-full h-full p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-700">Métricas</h2>
            <span className="text-xs text-zinc-400">Uma visão geral dos seus atendimentos</span>
          </div>
          <Button variant={'outline'} onClick={handleAmountVisibility}>
            {isAmountVisible ? <Eye /> : <EyeOff />}
          </Button>
        </div>

        {!isLoading && <MainChart isHiddenValues={!isAmountVisible} data={data.data} />}

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center w-full gap-2">
            <h2 className="text-sm text-zinc-700">Consultas no mês</h2>
            {isAmountVisible ? (
              <strong className="text-3xl font-semibold flex items-start gap-2">120</strong>
            ) : (
              <div className="bg-zinc-300 h-9 w-4/12 rounded-md" />
            )}
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              {isAmountVisible ? (
                <strong className="text-red-500 flex items-center gap-2">20%</strong>
              ) : (
                <div className="w-7 h-4 bg-zinc-300 rounded-sm" />
              )}
              a menos que o último mês
            </span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center w-full gap-2">
            <h2 className="text-sm text-zinc-700">Faturamento estimado</h2>
            {isAmountVisible ? (
              <strong className="text-3xl font-semibold">R$ 12.000</strong>
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
  )
}
