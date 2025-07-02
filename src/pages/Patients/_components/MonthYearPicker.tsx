import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const months = [
  { value: '00', label: 'Jan' },
  { value: '01', label: 'Fev' },
  { value: '02', label: 'Mar' },
  { value: '03', label: 'Abr' },
  { value: '04', label: 'Mai' },
  { value: '05', label: 'Jun' },
  { value: '06', label: 'Jul' },
  { value: '07', label: 'Ago' },
  { value: '08', label: 'Set' },
  { value: '09', label: 'Out' },
  { value: '10', label: 'Nov' },
  { value: '11', label: 'Dez' },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - 20 + i)

type CustomMonthYearPickerProps = {
  selectedMonth: string
  setSelectedMonth: (arg: string) => void
  selectedYear: string
  setSelectedYear: (arg: string) => void
}

export const CustomMonthYearPicker: React.FC<CustomMonthYearPickerProps> = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2">
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger id="month-select">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger id="year-select">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
