import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartData = [
  { month: 'Janeiro', services: 186 },
  { month: 'Fevereiro', services: 305 },
  { month: 'Março', services: 237 },
  { month: 'Abril', services: 73 },
  { month: 'Junho', services: 209 },
  { month: 'Julho', services: 214 },
  { month: 'Agosto', services: 186 },
  { month: 'Setembro', services: 305 },
  { month: 'Outubro', services: 237 },
  { month: 'Novembro', services: 0 },
  { month: 'Dezembro', services: 0 },
]

const emptyChart = [
  { month: 'Janeiro', services: 0 },
  { month: 'Fevereiro', services: 0 },
  { month: 'Março', services: 0 },
  { month: 'Abril', services: 0 },
  { month: 'Junho', services: 0 },
  { month: 'Julho', services: 0 },
  { month: 'Agosto', services: 0 },
  { month: 'Setembro', services: 0 },
  { month: 'Outubro', services: 0 },
  { month: 'Novembro', services: 0 },
  { month: 'Dezembro', services: 0 },
]

const chartConfig = {
  services: {
    label: 'Consultas',
    color: '#7c3aed',
    // color: "#147d89"
  },
} satisfies ChartConfig

type MainChartProps = {
  isHiddenValues?: boolean
}

export const MainChart: React.FC<MainChartProps> = ({ isHiddenValues = false }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={isHiddenValues ? emptyChart : chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="services" fill="var(--color-services)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
