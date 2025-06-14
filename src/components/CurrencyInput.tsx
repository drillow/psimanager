import { Label } from '@/components/ui/label'
import { Input, InputProps } from '@/components/ui/input'

interface CurrencyInputProps extends InputProps {
  currencyLabel: string
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ currencyLabel, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label htmlFor={'currency'} className="text-right text-sm leading-none">
        Valor da consulta
      </Label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 dark:text-gray-400">
          {currencyLabel}
        </span>
        <Input id="currency" type="number" placeholder="Valor" className="pl-10 mr-6" {...props} />
      </div>
    </div>
  )
}
