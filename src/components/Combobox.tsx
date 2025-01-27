import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Label } from "./ui/label"

const frameworks = [
  {
    value: "next.js",
    label: "Felipe Vieira Lima",
  },
  {
    value: "sveltekit",
    label: "Tamires Brito dos Santos",
  },
  {
    value: "nuxt.js",
    label: "Suzy Anne Teles Vieira",
  },
  {
    value: "remix",
    label: "Alexandre GusMão Lima",
  },
  {
    value: "astro",
    label: "Gabriel Vieira Lima",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="recurrence">Selecione o paciente</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Selecione um paciente..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Buscar paciente..."/>
            <CommandList>
              <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
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
