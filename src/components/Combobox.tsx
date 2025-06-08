import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Label } from './ui/label'

interface ComboboxProps {
  dataList: { label: string; value: string }[]
  onSelectValue: (value: string) => void
  selectedValue: string
  isLoading: boolean
}

export function Combobox({ dataList, selectedValue, onSelectValue, isLoading }: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="recurrence">Paciente</Label>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isLoading}
          >
            {selectedValue
              ? dataList.find((item) => item.value === selectedValue)?.label
              : 'Selecione um paciente...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[475px]">
          <Command className="w-full">
            {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
            <CommandList>
              <CommandEmpty className="flex flex-col items-center text-sm py-4">
                Nenhum paciente encontrado.
                <a href={'/patients'} className="text-violet-500 underline">
                  Clique aqui para adicionar um novo paciente
                </a>
              </CommandEmpty>
              <CommandGroup>
                {dataList?.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      onSelectValue(currentValue === selectedValue ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {/* <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === item.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    /> */}
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
