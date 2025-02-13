import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export const CreateUserButton = () => {
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
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value=""
              placeholder="Nome completo do paciente"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input id="email" value="" placeholder="umemail@email.com" />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <Label htmlFor="cellphone" className="text-right">
                Celular
              </Label>
              <Input id="cellphone" value="" placeholder="(11) 11111-1111" />
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="recurrence">Recorrente</Label>
              <div className="h-9 flex items-center">
                <Switch id="recurrence" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="has-whatsapp">WhatsApp</Label>
              <div className="h-9 flex items-center">
                <Switch id="has-whatsapp" />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="isOnline" className="text-left">
                Consulta online
              </Label>
              <div className="h-9 flex items-center">
                <Switch id="isOnline" />
              </div>
            </div>
          </div>
          {/*           
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
          </div> */}
          {/* <div className="flex items-center gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <Label>
                Horario da consulta
              </Label>
              <Input value="" placeholder="00:00"/>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="recurrence">Recorrente</Label>
              <div className="h-9 flex items-center">
                <Switch id="recurrence"/>
              </div>
            </div>
          </div> */}
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant={'outline'} className="w-3/12">
              Cancelar
            </Button>
          </DialogTrigger>
          <Button type="submit" className="w-3/12">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
