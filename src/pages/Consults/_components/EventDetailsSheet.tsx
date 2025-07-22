import { SheetTitle } from '@/components/ui/sheet'
import { CalendarClockIcon, Edit, NotepadText, Trash } from 'lucide-react'
import { CalendarEvent } from './WeekCalendar'
import { useRef, useState } from 'react'
import { cx } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { useSaveNotes } from '@/service/consults/hooks'
import { DeleteConsult } from '@/components/DeleteConsult'
import { EditConsultModal } from '@/pages/Consults/_components/EditConsultModal'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type EventDetailsProps = {
  event: CalendarEvent
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EventDetailsSheet: React.FC<EventDetailsProps> = ({ event, open, onOpenChange }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [defaultNotes, setDefaultNotes] = useState(event.notes)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [enableTextArea, setEnableTextArea] = useState(false)

  const formatEventEndTime = (dateString: string, duration: number) => {
    const startDate = new Date(dateString)
    const endDate = new Date(startDate.getTime() + duration * 60000) // Add duration in milliseconds
    return endDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const parseName = (name: string) => {
    return name.split(' ').slice(0, 2).join(' ')
  }

  const { execute, isLoading } = useSaveNotes(() => {
    setEnableTextArea(!enableTextArea)
  })

  const handleSaveNotes = () => {
    if (defaultNotes) {
      execute({ consultId: event.id, notes: defaultNotes })
    }
  }

  const handleOpenDeleteModal = () => setOpenDeleteModal((prevState) => !prevState)

  const handleOpenEditModal = () => setOpenEditModal((prevState) => !prevState)

  return (
    <Dialog open={open} onOpenChange={onOpenChange} key={event.id} modal>
      <DialogContent className="min-w-[675px]">
        <DialogHeader>
          <SheetTitle>Detalhes da consulta</SheetTitle>
        </DialogHeader>
        <Tabs defaultValue="tab-1">
          <ScrollArea>
            <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full flex items-start justify-start">
              <TabsTrigger
                value="tab-1"
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <CalendarClockIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Dados da consulta
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <NotepadText className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                {/* <NotepadText className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" /> */}
                Anotações
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="tab-1">
            <div className="flex flex-col gap-4 relative">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">Paciente</span>
                <span className="text-sm font-normal text-zinc-500 capitalize">
                  {parseName(event.patientName).toLowerCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Horário da consulta</span>
                  <span className="text-sm font-normal text-zinc-500">
                    {formatEventTime(event.date)} -{' '}
                    {formatEventEndTime(event.date, event.consultDuration)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Situação</span>
                  <span className="text-sm font-normal text-zinc-500">
                    {event.completed ? 'Completa' : 'Não finalizada'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">Tipo de consulta</span>
                <span className="text-sm font-normal text-zinc-500 capitalize">
                  {event.type === 'IN_PERSON' ? 'Presencial' : 'Online'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">Local</span>
                <span className="text-sm font-normal text-zinc-500 capitalize">
                  {event.type === 'IN_PERSON' ? event.place : event.url}
                </span>
              </div>

              {/* <Separator orientation="horizontal" /> */}

              <DeleteConsult
                consultDate={event.date}
                consultId={event.id}
                patientName={event.patientName}
                isOpen={openDeleteModal}
                onSetOpen={handleOpenDeleteModal}
              />
              <EditConsultModal
                consultData={event}
                isOpen={openEditModal}
                setIsOpen={handleOpenEditModal}
              />
              <div className="flex items-center gap-4 w-full mt-4">
                <Button variant={'secondary'} className="w-full" onClick={handleOpenEditModal}>
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
                <Button variant={'destructive'} className="w-full" onClick={handleOpenDeleteModal}>
                  <Trash className="w-4 h-4" />
                  Remover
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tab-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">Anotações</span>
                <span
                  className="text-xs text-purple-500 flex items-center gap-2 transition-all ease-in-out hover:cursor-pointer hover:text-purple-700"
                  onClick={() => {
                    setEnableTextArea(!enableTextArea)
                    textAreaRef.current?.focus()
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </span>
              </div>
              <textarea
                ref={textAreaRef}
                className={cx(
                  `w-full h-60 p-2 border border-zinc-300 rounded-md resize-none focus:outline-none  `,
                  enableTextArea
                    ? 'cursor-text text-black focus:ring-2 focus:ring-violet-500'
                    : 'cursor-not-allowed text-zinc-500',
                )}
                placeholder="Escreva suas anotações aqui..."
                readOnly={!enableTextArea}
                value={defaultNotes}
                onChange={(e) => setDefaultNotes(e.target.value)}
              ></textarea>
              {enableTextArea && (
                <div className="flex items-center justify-end">
                  <Button type="button" onClick={() => handleSaveNotes()} disabled={isLoading}>
                    Salvar
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
