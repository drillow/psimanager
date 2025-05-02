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
import { Label } from './ui/label'
import { Switch } from './ui/switch'
// import { useAddPatient } from '@/service/patient/hooks'
// import { useAuth } from '@/context/auth'
import { useForm } from 'react-hook-form'
import { useAddPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { PatientPayload } from '@/service/patient/service'

import { useQueryClient } from '@tanstack/react-query'
import { formatCellphone } from '@/utils/masks/phone_mask'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { CustomInput } from './CustomInput'
import { QueryKeys } from '@/utils/queryKeys'

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  firstName: z.string().min(1, { message: 'Nome obrigatório' }),
  lastName: z.string().min(1, { message: 'Sobrenome obrigatório' }),
  phoneNumber: z
    .string({ message: 'Telefone obrigatório' })
    .min(11, 'Telefone inválido'),
  isWhatsApp: z.boolean().default(false),
  age: z.number().optional(),
})

type FormProps = z.infer<typeof formSchema>

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

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isWhatsApp: false,
    },
  })

  const { handleSubmit, control } = form

  const { execute, isLoading } = useAddPatient(user.id, () => {
    setIsOpen(false)
    queryClient.invalidateQueries({
      queryKey: QueryKeys.PATIENT.LIST,
    })
  })

  const handlePayload = (data: PatientPayload) => {
    execute(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogContent className="max-w-[525px]">
          <Form {...form}>
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
                  <FormField
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <CustomInput
                            label="Nome"
                            id="name"
                            placeholder="Nome"
                            // className="col-span-3"
                            {...field}
                          />
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
                              const formattedValue = formatCellphone(
                                e.target.value,
                              )
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
                            onChange={(e) => {
                              field.onChange(Number(e.target.value))
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
      </DialogPortal>
    </Dialog>
  )
}
