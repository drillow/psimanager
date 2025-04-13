import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
// import { useAddPatient } from '@/service/patient/hooks'
// import { useAuth } from '@/context/auth'
import { Controller, useForm } from 'react-hook-form'
import { useAddPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { PatientPayload } from '@/service/patient/service'

import { useQueryClient } from '@tanstack/react-query'
import { formatCellphone } from '@/utils/masks/phone_mask'

type AddPatientButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const AddPatientButton: React.FC<AddPatientButtonProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { handleSubmit, control } = useForm<PatientPayload>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isWhatsApp: false,
    },
  })

  const { execute, isLoading } = useAddPatient(user.id, () => {
    setIsOpen(false)
    queryClient.invalidateQueries({
      queryKey: ['PATIENT_LIST'],
    })
  })

  const handlePayload = (data: PatientPayload) => {
    execute(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        
      </DialogTrigger> */}
      <DialogPortal>
        <DialogContent className="max-w-[525px]">
          <form
            onSubmit={handleSubmit(handlePayload)}
            className="grid gap-4 py-2"
          >
            <DialogHeader>
              <DialogTitle>Adicionar paciente</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
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
                      onChange={(e) => {
                        const formattedValue = formatCellphone(e.target.value)
                        onChange(formattedValue)
                      }}
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
                <Button variant={'outline'} className="w-3/12">
                  Cancelar
                </Button>
              </DialogTrigger>
              <Button type="submit" className="w-3/12" disabled={isLoading}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
