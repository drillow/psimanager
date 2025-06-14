import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartData = [
  { month: 'Janeiro', in_person: 186, online: 20 },
  { month: 'Fevereiro', in_person: 305, online: 40 },
  { month: 'Março', in_person: 237, online: 50 },
  { month: 'Abril', in_person: 73, online: 80 },
  { month: 'Junho', in_person: 209, online: 110 },
  { month: 'Julho', in_person: 214, online: 40 },
  { month: 'Agosto', in_person: 186, online: 50 },
  { month: 'Setembro', in_person: 305, online: 90 },
  { month: 'Outubro', in_person: 237, online: 20 },
  { month: 'Novembro', in_person: 0, online: 30 },
  { month: 'Dezembro', in_person: 10, online: 0 },
]

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
    label: 'Consultas',
    color: '#7c3aed',
    // color: "#147d89"
  },
  online: {
    label: 'Online',
    color: '#a97ff1',
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
        {/* <Bar dataKey="in_person" fill="var(--color-in_person)" radius={8} /> */}
        <Bar dataKey="in_person" stackId="a" fill="var(--color-in_person)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="online" stackId="a" fill="var(--color-online)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
