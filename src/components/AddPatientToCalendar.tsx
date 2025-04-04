import { CalendarIcon, Link2, MapPin, PlusIcon } from 'lucide-react'
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
import { TimePicker } from './TimePicker'
import { Input } from './ui/input'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
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
import { RRule, Weekday } from 'rrule'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { format, formatISO } from 'date-fns'
import { Combobox } from './Combobox'
import { useGetSelectListPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'

const formSchema = z.object({
  patientName: z.string().min(2).max(50),
  startDate: z.object({
    date: z.date(),
  }),
  consultType: z.string(),
  place: z.string().optional(),
  url: z.string().optional(),
  repeat: z.boolean().default(false),
  frequency: z
    .object({
      times: z.string().min(1),
      interval: z.union([z.literal('week'), z.literal('month')]).optional(),
      days: z.array(z.any()).optional(),
    })
    .optional(),
})

type FormProps = z.infer<typeof formSchema>

export const AddPatientToCalendar = () => {
  const { user } = useAuth()
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consultType: 'presencial',
      repeat: false,
    },
  })

  const { data, isLoading } = useGetSelectListPatient(user.id)

  const handleSubmitForm = (dataPayload: FormProps) => {
    const wkst = dataPayload?.frequency?.days?.map((day) => {
      const dayMapping: Record<string, Weekday> = {
        MO: RRule.MO,
        TU: RRule.TU,
        WE: RRule.WE,
        TH: RRule.TH,
        FR: RRule.FR,
        SA: RRule.SA,
        SU: RRule.SU,
      }
      return dayMapping[day]
    })

    console.log(wkst)

    const rrule = new RRule({
      dtstart: dataPayload.startDate.date,

      byweekday: wkst ?? null,
      ...(dataPayload.repeat && {
        freq:
          dataPayload.frequency?.interval === 'month'
            ? RRule.MONTHLY
            : RRule.WEEKLY,
      }),
    })

    const payload = {
      patientId: dataPayload.patientName,
      startDate: formatISO(dataPayload.startDate.date),
      rrule: rrule.toString(),
      type: dataPayload.consultType,
      userId: '',
      ...(dataPayload.place && { place: dataPayload.place }),
      ...(dataPayload.url && { url: dataPayload.url }),
    }

    // TODO: Request here

    console.log('Payload', payload)
    console.log(rrule.toString())
    console.log({ ...dataPayload, rrule: rrule.toString() })
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">
            <PlusIcon />
            Adicionar paciente
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[525px]">
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Adicionar consulta</DialogTitle>
              <DialogDescription>
                Selecione o dia, hora e tipo de consulta
              </DialogDescription>
            </DialogHeader>
            {/* <Form {...form}> */}
            <div className="grid gap-6 py-2">
              <div className="flex flex-col items-start gap-2">
                {/* <Label htmlFor="username" className="text-right">
                  Nome do paciente
                </Label> */}
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
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start gap-2">
                  <Label className="text-right">Data da consulta</Label>
                  <FormField
                    control={form.control}
                    name="startDate.date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover modal>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="startDate.date"
                  render={({ field: { value, onChange } }) => (
                    <TimePicker
                      date={value}
                      setDate={(date) => onChange(date)}
                    />
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
                    <div className="flex items-center gap-2">
                      <Checkbox
                        title="Presencial"
                        checked={field.value === 'presencial'}
                        onCheckedChange={() => field.onChange('presencial')}
                      />
                      <span className="text-sm text-zinc-600">Presencial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        title="Online"
                        checked={field.value === 'remote'}
                        onCheckedChange={() => field.onChange('remote')}
                      />
                      <span className="text-sm text-zinc-600">Online</span>
                    </div>
                  </div>
                )}
              />

              {form.watch('consultType') === 'remote' ? (
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
                        <Input
                          type="email"
                          placeholder="Link"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                      <span className={'text-xs text-zinc-400'}>
                        Com a conta do Google <strong>conectada</strong>, o link
                        será gerado automaticamente ao salvar a consulta. Caso
                        queira adicionar link de{' '}
                        <strong>outra plataforma</strong> basta digitar no campo
                        acima.
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
                        <Input
                          placeholder="Endereço"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="repeat"
                render={({ field }) => (
                  <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="" className="text-right">
                      Repetir consulta
                    </Label>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              {form.watch('repeat') && (
                <div className="flex flex-col items-start gap-2">
                  <Label>Repetir</Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600 w-12">A cada</span>
                      <FormField
                        control={form.control}
                        name="frequency.times"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                className="w-20"
                                min={0}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="frequency.interval"
                        render={({ field: { name, onChange, value } }) => (
                          <Select
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Tempo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="week">Semana</SelectItem>
                                <SelectItem value="month">Mês</SelectItem>
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
