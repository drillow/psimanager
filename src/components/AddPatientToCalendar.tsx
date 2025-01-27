import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ComboboxDemo } from "./Combobox"
import { Label } from "./ui/label"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { TimePicker } from "./TimePicker"
import { useState } from "react"

export const AddPatientToCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Adicionar paciente</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <ComboboxDemo />
                  
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Dias da semana
            </Label>
            <ToggleGroup type="multiple" variant={"outline"} className="w-full">
              <ToggleGroupItem value="seg" className="w-full">Seg</ToggleGroupItem>
              <ToggleGroupItem value="ter" className="w-full">Ter</ToggleGroupItem>
              <ToggleGroupItem value="qua" className="w-full">Qua</ToggleGroupItem>
              <ToggleGroupItem value="qui" className="w-full">Qui</ToggleGroupItem>
              <ToggleGroupItem value="sex" className="w-full">Sex</ToggleGroupItem>
              <ToggleGroupItem value="sab" className="w-full">Sab</ToggleGroupItem>
              <ToggleGroupItem value="dom" className="w-full">Dom</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <TimePicker date={date} setDate={(date) => setDate(date)}/>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="w-3/12">Cancelar</Button>
          </DialogTrigger>
          <Button type="submit" className="w-3/12">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}