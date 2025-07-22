import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
} from '../../../components/ui/dialog'
import { Label } from '../../../components/ui/label'
import { Switch } from '../../../components/ui/switch'
// import { useAddPatient } from '@/service/patient/hooks'
// import { useAuth } from '@/context/auth'
import { useForm } from 'react-hook-form'
import { useAddPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'

import { useQueryClient } from '@tanstack/react-query'
import { formatCellphone } from '@/utils/masks/phone_mask'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { CustomInput } from '../../../components/CustomInput'
import { QueryKeys } from '@/utils/queryKeys'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Info, MapPinHouseIcon, User } from 'lucide-react'
import { TabsContent } from '@radix-ui/react-tabs'

const formSchema = z.object({
  email: z.string().email('E-mail inválido').optional(),
  firstName: z.string().min(1, { message: 'Nome obrigatório' }),
  lastName: z.string().min(1, { message: 'Sobrenome obrigatório' }),
  phoneNumber: z.string({ message: 'Telefone obrigatório' }).min(11, 'Telefone inválido'),
  isWhatsApp: z.boolean().default(false),
  age: z.number().optional(),
  birthDate: z.date().optional(),
  cep: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  takeMedication: z.boolean().default(false),
  medicationInfo: z.string().optional(),
  hadTherapyBefore: z.boolean().default(false),
})

type FormProps = z.infer<typeof formSchema>

type AddPatientButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const AddPatientButton: React.FC<AddPatientButtonProps> = ({ isOpen, setIsOpen }) => {
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
      hadTherapyBefore: false,
      takeMedication: false,
      address: '',
      birthDate: undefined,
      cep: '',
      city: '',
      complement: '',
      country: '',
      medicationInfo: '',
      neighborhood: '',
      number: '',
      state: '',
    },
  })

  const { handleSubmit, control } = form

  const { execute, isLoading } = useAddPatient(user.id, () => {
    setIsOpen(false)
    queryClient.invalidateQueries({
      queryKey: QueryKeys.PATIENT.LIST,
    })
  })

  const handlePayload = (data: FormProps) => {
    const payload = {
      ...data,
      number: Number(data.number),
    }
    execute(payload)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogContent className="min-w-[700px]">
          <Form {...form}>
            <form onSubmit={handleSubmit(handlePayload)} className="grid gap-4 py-2">
              <DialogHeader>
                <DialogTitle>Adicionar paciente</DialogTitle>
                <DialogDescription>
                  {/* 
                  <br /> */}
                  Preencha os dados dos paciente. Endereço e Mais informações não são orbigatórias.
                  <br />
                  Você pode preencher depois em informações do paciente.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="tab-1">
                <ScrollArea>
                  <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full flex items-start justify-start">
                    <TabsTrigger
                      value="tab-1"
                      className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <User className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                      Dados pessoais
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-2"
                      className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <MapPinHouseIcon
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Endereço
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-3"
                      className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <Info className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                      Mais informações
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="tab-1">
                  <div className="flex flex-col gap-4 mt-2">
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
                  </div>
                </TabsContent>
                <TabsContent value="tab-2">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <FormField
                          control={control}
                          name="cep"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="CEP"
                                  id="cep"
                                  placeholder="00000-000"
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
                          name="address"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Endereço"
                                  id="address"
                                  placeholder="Endereço"
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
                          name="number"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Número"
                                  id="number"
                                  placeholder="Número"
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
                          name="complement"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Complemento"
                                  id="complement"
                                  placeholder="Complemento"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <FormField
                          control={control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Bairro"
                                  id="neighborhood"
                                  placeholder="Bairro"
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
                          name="city"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Cidade"
                                  id="city"
                                  placeholder="Cidade"
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
                          name="state"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  label="Estado"
                                  id="state"
                                  placeholder="Estado"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                      <FormField
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <CustomInput
                                label="País"
                                id="country"
                                placeholder="País"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tab-3">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                      <FormField
                        control={control}
                        name="takeMedication"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <Label htmlFor="take-medication">Toma medicação?</Label>
                            <FormControl>
                              <Switch
                                id="take-medication"
                                checked={value}
                                onCheckedChange={onChange}
                                ref={ref}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="hadTherapyBefore"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <Label htmlFor="had-therapy-before">Já fez terapia antes?</Label>
                            <FormControl>
                              <Switch
                                id="had-therapy-before"
                                checked={value}
                                onCheckedChange={onChange}
                                ref={ref}
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
                        name="medicationInfo"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Label htmlFor="medicationInfo">Informações sobre a medicação</Label>
                            <FormControl>
                              <textarea
                                className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                id="medicationInfo"
                                placeholder="Informações sobre a medicação"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter className="pt-4">
                <DialogTrigger asChild>
                  <Button variant={'outline'} className="w-6/12">
                    Cancelar
                  </Button>
                </DialogTrigger>
                <Button type="submit" className="w-6/12" disabled={isLoading}>
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
