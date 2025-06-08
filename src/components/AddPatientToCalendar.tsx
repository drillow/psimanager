import { Link2, MapPin } from 'lucide-react'
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
import { Label } from './ui/label'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { Checkbox } from './ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

import { Combobox } from './Combobox'
import { useGetSelectListPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { useAddNewConsult } from '@/service/consults/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/utils/queryKeys'
import React from 'react'
import { SubscriptionStatus, useSubscriptionStatus } from '@/context/subscriptionStatus'
import { cx } from 'class-variance-authority'
import { CurrencyInput } from './CurrencyInput'
import { DateTimePicker } from './TesteCalendar'
import { toast } from 'sonner'

const formSchema = z.object({
  patientName: z.string({ message: 'Selecione um paciente' }).min(2).max(50),
  startDate: z.object({
    date: z.date({ message: 'Obrigatório' }),
  }),
  consultType: z.string(),
  consultValue: z.string(),
  place: z.string().optional(),
  url: z.string().optional(),
  repeat: z.boolean().default(false),
  frequency: z
    .object({
      interval: z.union([z.literal('WEEK'), z.literal('MONTH')]).optional(),
      days: z.array(z.any()).optional(),
    })
    .optional(),
})

type FormProps = z.infer<typeof formSchema>

type AddPatientToCalendarProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type Interval = 'WEEK' | 'MONTH'

export type ConsultType = 'ONLINE' | 'IN_PERSON'

type Payload = {
  userId: string
  patientId: string
  startDate: string
  type: string
  consultValue: string
  hasRecurrence: boolean
  place?: string
  url?: string
  interval?: Interval
  days?: number[]
}

export const AddPatientToCalendar: React.FC<AddPatientToCalendarProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const { status } = useSubscriptionStatus()

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consultType: 'IN_PERSON',
      repeat: false,
    },
  })

  const { data, isLoading } = useGetSelectListPatient(user.id)

  const { execute } = useAddNewConsult({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.CONSULTS.DEFAULT,
      })
      setIsOpen(false)
    },
    onError: (message) => {
      if (message === 'Consult already exists for this time') {
        return toast.error('Já existe uma consulta agendada para este horário.')
      }

      toast.error('Ocorreu um erro ao adicionar a consulta. Tente novamente mais tarde.')
    },
  })

  const handleSubmitForm = async (dataPayload: FormProps) => {
    const { date } = dataPayload.startDate

    const wkstNumber = dataPayload?.frequency?.days?.map((day) => {
      const dayMapping: Record<string, number> = {
        SU: 0,
        MO: 1,
        TU: 2,
        WE: 3,
        TH: 4,
        FR: 5,
        SA: 6,
      }
      return dayMapping[day]
    })

    const payload = {
      userId: user.id,
      patientId: dataPayload.patientName,
      consultValue: dataPayload.consultValue,
      type: dataPayload.consultType,
      hasRecurrence: dataPayload.repeat,
      interval: dataPayload.frequency?.interval,
      startDate: date.toISOString().replace(/\.\d+/, ''),
      days: wkstNumber,
      ...(dataPayload.place && { place: dataPayload.place }),
      ...(dataPayload.url && { url: dataPayload.url }),
    } as Payload

    await execute(payload)
  }

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[525px]">
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Adicionar consulta</DialogTitle>
              <DialogDescription>Selecione o dia, hora e tipo de consulta</DialogDescription>
            </DialogHeader>
            {/* <Form {...form}> */}
            <div className="grid gap-6 py-2">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Combobox
                        dataList={data}
                        selectedValue={value}
                        onSelectValue={onChange}
                        isLoading={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate.date"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col items-start gap-2">
                          <Label htmlFor={'currency'} className="text-right">
                            Data da consulta
                          </Label>
                          <DateTimePicker date={value} setDate={(date) => onChange(date)} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consultValue"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CurrencyInput currencyLabel="R$" value={value} onChange={onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="consultType"
                render={({ field }) => (
                  <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="username" className="text-right">
                      Tipo de consulta
                    </Label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="IN_PERSON"
                        className={cx(
                          'flex items-center gap-2 p-2 rounded-lg cursor-pointer',
                          field.value === 'IN_PERSON' ? 'border border-zinc-300' : 'bg-zinc-100',
                        )}
                      >
                        <Checkbox
                          id="IN_PERSON"
                          title="Presencial"
                          checked={field.value === 'IN_PERSON'}
                          onCheckedChange={() => field.onChange('IN_PERSON')}
                          className={cx(
                            'bg-white',
                            field.value === 'IN_PERSON' ? 'border-violet-700' : 'border-zinc-300',
                          )}
                        />
                        <span className="text-sm text-zinc-600">Presencial</span>
                      </label>
                      <label
                        htmlFor="ONLINE"
                        className={cx(
                          'flex items-center gap-2 p-2 rounded-lg cursor-pointer',
                          field.value === 'ONLINE' ? 'border border-zinc-300' : 'bg-zinc-100',
                        )}
                      >
                        <Checkbox
                          id="ONLINE"
                          title="Online"
                          checked={field.value === 'ONLINE'}
                          onCheckedChange={() => field.onChange('ONLINE')}
                          className={cx(
                            'bg-white',
                            field.value === 'ONLINE' ? 'border-violet-700' : 'border-zinc-300',
                          )}
                        />
                        <span className="text-sm text-zinc-600">Online</span>
                      </label>
                    </div>
                  </div>
                )}
              />

              {form.watch('consultType') === 'ONLINE' ? (
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <div className="flex flex-col items-start gap-2">
                      <Label htmlFor="username" className="text-right">
                        Link da consulta
                      </Label>

                      <div className="relative w-full">
                        <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input type="url" placeholder="Link" className="pl-10" {...field} />
                      </div>
                      <span className={'text-xs text-zinc-400'}>
                        Com a conta do Google <strong>conectada</strong>, o link será gerado
                        automaticamente ao salvar a consulta. Caso queira adicionar link de{' '}
                        <strong>outra plataforma</strong> basta digitar no campo acima.
                      </span>
                    </div>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <div className="flex flex-col items-start gap-2">
                      <Label htmlFor="username" className="text-right">
                        Local da consulta
                      </Label>
                      <div className="relative w-full">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input placeholder="Clinica ou Endereço" className="pl-10" {...field} />
                      </div>
                    </div>
                  )}
                />
              )}

              {/* {status === SubscriptionStatus.ACTIVE && ( */}
              <FormField
                control={form.control}
                name="repeat"
                render={({ field }) => (
                  <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="" className="text-right">
                      Repetir consulta
                    </Label>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </div>
                )}
              />
              {/* )} */}

              {form.watch('repeat') && (
                <div className="flex flex-col items-start gap-2">
                  <Label>Repetir</Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600 w-12">A cada</span>
                      <FormField
                        control={form.control}
                        name="frequency.interval"
                        render={({ field: { name, onChange, value } }) => (
                          <Select name={name} onValueChange={onChange} defaultValue={value}>
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Tempo" defaultValue={'WEEK'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="WEEK">Semana</SelectItem>
                                <SelectItem value="MONTH">Mês</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-sm text-zinc-600 w-14">Em</span>
                      <FormField
                        name="frequency.days"
                        control={form.control}
                        render={({ field: { onChange, value } }) => (
                          <ToggleGroup
                            type="multiple"
                            variant={'outline'}
                            className="w-full"
                            onValueChange={onChange}
                            value={value}
                          >
                            <ToggleGroupItem value="MO" className="w-full">
                              Seg
                            </ToggleGroupItem>
                            <ToggleGroupItem value="TU" className="w-full">
                              Ter
                            </ToggleGroupItem>
                            <ToggleGroupItem value="WE" className="w-full">
                              Qua
                            </ToggleGroupItem>
                            <ToggleGroupItem value="TH" className="w-full">
                              Qui
                            </ToggleGroupItem>
                            <ToggleGroupItem value="FR" className="w-full">
                              Sex
                            </ToggleGroupItem>
                            <ToggleGroupItem value="SA" className="w-full">
                              Sab
                            </ToggleGroupItem>
                            <ToggleGroupItem value="SU" className="w-full">
                              Dom
                            </ToggleGroupItem>
                          </ToggleGroup>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant={'outline'} className="w-3/12" type="button">
                  Cancelar
                </Button>
              </DialogTrigger>
              <Button className="w-3/12" type="submit">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
