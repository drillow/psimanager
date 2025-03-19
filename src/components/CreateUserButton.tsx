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
// import { useAddPatient } from '@/service/patient/hooks'
// import { useAuth } from '@/context/auth'
import { useForm } from 'react-hook-form'

export const CreateUserButton = () => {
  // const { user } = useAuth()
  // const { execute, isError, isLoading } = useAddPatient(user.id)
  const { handleSubmit } = useForm()

  const handlePayload = (data) => console.log(data)

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
        <form
          onSubmit={handleSubmit(handlePayload)}
          className="grid gap-4 py-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value=""
                placeholder="Nome"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Sobrenome
              </Label>
              <Input
                id="lastName"
                value=""
                placeholder="Sobrenome"
                className="col-span-3"
              />
            </div>
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
              <Label htmlFor="has-whatsapp">WhatsApp</Label>
              <div className="h-9 flex items-center">
                <Switch id="has-whatsapp" />
              </div>
            </div>
          </div>
        </form>
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
