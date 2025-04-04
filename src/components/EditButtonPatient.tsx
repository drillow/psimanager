import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from './ui/dialog'
import { Label } from './ui/label'
import { Controller, useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { PatientPayload } from '@/service/patient/service'
import { PencilIcon } from 'lucide-react'
import { useEditPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { useQueryClient } from '@tanstack/react-query'

interface EditPatientButtonProps {
  patientData: PatientPayload
}

export const EditPatientButton: React.FC<EditPatientButtonProps> = ({
  patientData,
}) => {
  const [open, setOpen] = useState(false)

  const { user } = useAuth()

  const queryClient = useQueryClient()

  const { execute, isError, isLoading } = useEditPatient(
    user.id,
    patientData.id!,
    () => {
      queryClient.invalidateQueries({
        queryKey: ['PATIENT_LIST'],
      })
      setOpen(false)
    },
  )

  const { handleSubmit, control } = useForm<PatientPayload>({
    defaultValues: {
      email: patientData.email,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      phoneNumber: patientData.phoneNumber,
      isWhatsApp: patientData.isWhatsApp,
    },
  })

  const handlePayload = (data: PatientPayload) => {
    execute(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <form
          onSubmit={handleSubmit(handlePayload)}
          className="grid gap-4 py-2"
        >
          <DialogHeader>
            <DialogTitle>Editar paciente</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    id="name"
                    value={value}
                    onChange={onChange}
                    placeholder="Nome"
                    className="col-span-3"
                    ref={ref}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Sobrenome
              </Label>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    id="lastName"
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    placeholder="Sobrenome"
                    className="col-span-3"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    id="email"
                    placeholder="umemail@email.com"
                    value={value}
                    onChange={onChange}
                    ref={ref}
                  />
                )}
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <Label htmlFor="cellphone" className="text-right">
                Celular
              </Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    id="cellphone"
                    value={value}
                    placeholder="(11) 11111-1111"
                    onChange={onChange}
                    ref={ref}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="has-whatsapp">WhatsApp</Label>
              <div className="h-9 flex items-center">
                <Controller
                  name="isWhatsApp"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      id="has-whatsapp"
                      checked={value}
                      onCheckedChange={onChange}
                      // onChange={onChange}
                      ref={ref}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                className="w-3/12"
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </DialogTrigger>
            <Button type="submit" className="w-3/12" disabled={isLoading}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
