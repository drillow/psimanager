import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '../../../components/ui/dialog'
import { Label } from '../../../components/ui/label'
import { useForm } from 'react-hook-form'
import { Switch } from '../../../components/ui/switch'
import { PatientPayload } from '@/service/patient/service'

import { useEditPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { useQueryClient } from '@tanstack/react-query'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { CustomInput } from '../../../components/CustomInput'
import { formatCellphone } from '@/utils/masks/phone_mask'
import { QueryKeys } from '@/utils/queryKeys'

interface EditPatientModalProps {
  patientData: PatientPayload
  open: boolean
  setOpen: (data?: boolean) => void
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  patientData,
  open = false,
  setOpen,
}) => {
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const { execute, isLoading } = useEditPatient(user.id, patientData.id!, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.PATIENT.LIST,
    })
    setOpen(false)
  })

  const form = useForm<PatientPayload>({
    defaultValues: {
      email: patientData.email,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      phoneNumber: patientData.phoneNumber,
      isWhatsApp: patientData.isWhatsApp,
      age: patientData.age || 0,
    },
  })

  const { control, handleSubmit } = form

  const handlePayload = (data: PatientPayload) => {
    execute(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal key={patientData.id}>
      {/* <DialogTrigger asChild>
        <button type="button" className="p-1 border border-zinc-300 rounded-md">
          <PencilIcon className="w-4 h-4" />
        </button>
      </DialogTrigger> */}
      <DialogContent className="max-w-[525px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(handlePayload)} className="grid gap-4 py-2">
            <DialogHeader>
              <DialogTitle>Adicionar paciente</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput label="Nome" id="name" placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Sobrenome"
                          id="lastName"
                          placeholder="Sobrenome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 w-full">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Email"
                          id="email"
                          placeholder="umemail@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          id="cellphone"
                          label="Celular"
                          type="tel"
                          placeholder="(11) 11111-1111"
                          error={!!error?.message}
                          {...field}
                          onChange={(e) => {
                            const formattedValue = formatCellphone(e.target.value)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col items-start gap-2 w-full">
                <FormField
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Idade"
                          id="age"
                          type="number"
                          placeholder="Idade"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value ? Number(e.target.value) : 0
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="has-whatsapp">WhatsApp</Label>
                <div className="h-9 flex items-center">
                  <FormField
                    name="isWhatsApp"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            id="has-whatsapp"
                            checked={value}
                            onCheckedChange={onChange}
                            // onChange={onChange}
                            ref={ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
