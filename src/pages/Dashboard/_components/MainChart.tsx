import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const emptyChart = [
  { month: 'Janeiro', in_person: 0, online: 0 },
  { month: 'Fevereiro', in_person: 0, online: 0 },
  { month: 'Março', in_person: 0, online: 0 },
  { month: 'Abril', in_person: 0, online: 0 },
  { month: 'Junho', in_person: 0, online: 0 },
  { month: 'Julho', in_person: 0, online: 0 },
  { month: 'Agosto', in_person: 0, online: 0 },
  { month: 'Setembro', in_person: 0, online: 0 },
  { month: 'Outubro', in_person: 0, online: 0 },
  { month: 'Novembro', in_person: 0, online: 0 },
  { month: 'Dezembro', in_person: 0, online: 0 },
]

const chartConfig = {
  in_person: {
    label: 'Presencial',
    color: '#7c3aed',
  },
  online: {
    label: 'Online',
    color: '#a97ff1',
  },
} satisfies ChartConfig

type MainChartProps = {
  isHiddenValues?: boolean
  data: { month: string; in_person: number; online: number }[]
}

export const MainChart: React.FC<MainChartProps> = ({ isHiddenValues = false, data }) => {
  const [chartData, setChartData] =
    useState<{ month: string; in_person: number; online: number }[]>()

  useEffect(() => {
    if (data) setChartData(data)
  }, [data])

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full"
      style={{ maxHeight: 300 }}
    >
      <BarChart
        accessibilityLayer
        data={isHiddenValues ? emptyChart : chartData}
        // barCategoryGap={30}
        barGap={'24px'}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <Bar dataKey="in_person" stackId="a" fill="var(--color-in_person)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="online" stackId="a" fill="var(--color-online)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
