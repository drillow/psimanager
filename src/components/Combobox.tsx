import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Label } from './ui/label'

// const frameworks = [
//   {
//     value: 'next.js',
//     label: 'Felipe Vieira Lima',
//   },
//   {
//     value: 'sveltekit',
//     label: 'Tamires Brito dos Santos',
//   },
//   {
//     value: 'nuxt.js',
//     label: 'Suzy Anne Teles Vieira',
//   },
//   {
//     value: 'remix',
//     label: 'Alexandre GusMão Lima',
//   },
//   {
//     value: 'astro',
//     label: 'Gabriel Vieira Lima',
//   },
// ]

interface ComboboxProps {
  dataList: { label: string; value: string }[]
  onSelectValue: (value: string) => void
  selectedValue: string
}

export function Combobox({
  dataList,
  selectedValue,
  onSelectValue,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="recurrence">Selecione o paciente</Label>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedValue
              ? dataList.find((item) => item.value === selectedValue)?.label
              : 'Selecione um paciente...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[475px]">
          <Command className="w-full">
            {/* <CommandInput
              placeholder="Buscar paciente..."
              className="h-9 w-full"
              autoFocus={true}
            /> */}
            <CommandList>
              <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
              <CommandGroup>
                {dataList.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      onSelectValue(
                        currentValue === selectedValue ? '' : currentValue,
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === item.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
