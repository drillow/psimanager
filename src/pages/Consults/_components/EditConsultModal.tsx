import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { format, formatISO, parseISO } from 'date-fns'
import { Link2, MapPin } from 'lucide-react'
import { Checkbox } from '../../../components/ui/checkbox'
import { Input } from '../../../components/ui/input'
import { CustomInput } from '../../../components/CustomInput'
import { useEffect, useState } from 'react'
import { useUpdateConsult } from '@/service/consults/hooks'
import { LoadingSpinner } from '../../../components/Spinner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@/utils/queryKeys'
import { useToast } from '@/hooks/use-toast'
import { cx } from 'class-variance-authority'
import { DateTimePicker } from '../../../components/TesteCalendar'
import { CurrencyInput } from '../../../components/CurrencyInput'
import { toZonedTime } from 'date-fns-tz'
import { CalendarEvent } from '@/pages/Consults/_components/WeekCalendar'

type EditPatientModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  consultData: CalendarEvent
}

const formSchema = z.object({
  startDate: z.object({
    date: z.date({ message: 'Obrigatório' }),
  }),
  consultType: z.string(),
  place: z.string().optional(),
  url: z.string().optional(),
  consultValue: z.string(),
})

type FormProps = z.infer<typeof formSchema>

export const EditConsultModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  setIsOpen,
  consultData,
}) => {
  const [changeAll, setChangeAll] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const { execute, isLoading, isError } = useUpdateConsult(() => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.CONSULTS.DEFAULT,
    })
    setIsOpen(false)
  })

  const handleUpdateConsult = async (data: FormProps) => {
    const payload = {
      ...data,
      type: data.consultType,
      startDate: formatISO(data.startDate.date),
      updateAllNextEvents: changeAll,
    }

    await execute({ consultId: consultData.id, consultPayload: payload })
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Erro ao atualizar consulta',
        description: 'Tente novamente mais tarde.',
      })
    }
  }, [isError])

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[525px]">
          <form onSubmit={form.handleSubmit(handleUpdateConsult)} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Editar consulta</DialogTitle>
              <DialogDescription>
                Alterar dados da consulta de {consultData.patientName} no dia{' '}
                {format(toZonedTime(parseISO(consultData.date), 'UTC'), "dd/MM/yyyy 'às' HH:mm")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-2">
              <div className="flex flex-col items-start gap-2">
                <CustomInput label="Paciente" value={consultData.patientName} disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate.date"
                  defaultValue={toZonedTime(parseISO(consultData?.date), 'UTC')}
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col items-start gap-2">
                          <Label className="text-right">Data da consulta</Label>
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
                defaultValue={consultData.type}
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
                  defaultValue={consultData?.url || ''}
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
                  defaultValue={consultData.place}
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
              <div className="flex items-center gap-2">
                <Checkbox
                  id="changeAll"
                  title="Mudar todas as próximas consultas"
                  checked={changeAll}
                  onCheckedChange={() => setChangeAll(!changeAll)}
                />
                <label className="text-sm text-zinc-600" htmlFor="changeAll">
                  Quero alterar todas as próximas consultas desse paciente também.
                </label>
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant={'outline'} className="w-3/12" type="button" disabled={isLoading}>
                  Cancelar
                </Button>
              </DialogTrigger>
              <Button className="w-3/12" type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
