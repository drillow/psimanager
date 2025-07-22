import { SheetTitle } from '@/components/ui/sheet'

import { Patients } from './TableColumns'

import { ConsultsNotes } from './ConsultsNotes'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DollarSign, NotepadText, PenLine, Trash, User, Info } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { DeletePatient } from './DeletePatientButton'
import { useState } from 'react'

type InfoPatientProps = {
  open: boolean
  patientData: Patients
  onOpenChange: (open: boolean) => void
  key: string
}

export const InfoPatient: React.FC<InfoPatientProps> = ({
  open,
  onOpenChange,
  patientData,
  key,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  // const [_, setIsEditing] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal key={key}>
      <DialogContent
        className="min-w-[800px] max-h-[calc(100vh-32px)]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <SheetTitle className="text-xl">Informações do paciente</SheetTitle>
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
                <NotepadText className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Anotações
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Info className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Mais informações
              </TabsTrigger>
              <TabsTrigger
                value="tab-4"
                disabled
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <DollarSign className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Pagamentos
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="tab-1">
            <ScrollArea className="max-h-[768px]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Identificação</span>
                  <div
                    className="text-purple-600 text-sm flex items-center gap-2 cursor-pointer hover:underline"
                    // onClick={() => setIsEditing((prevState) => !prevState)}
                  >
                    <PenLine className="w-4 h-4" />
                    Editar
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Paciente</span>
                    {/* <Input /> */}
                    <span className="text-sm font-normal text-zinc-500 capitalize">
                      {`${patientData.firstName} ${patientData.lastName}`.toLowerCase()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Dada de nascimento</span>
                    <span className="text-sm font-normal text-zinc-500">23/02/1998</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Celular</span>
                    {/* <Input /> */}
                    <span className="text-sm font-normal text-zinc-500">
                      {patientData.phoneNumber}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">WhatsApp</span>
                    <span className="text-sm font-normal text-zinc-500">
                      {patientData.isWhatsApp ? 'Sim' : 'Não'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">E-mail</span>
                  <span className="text-sm font-normal text-zinc-500">{patientData.email}</span>
                </div>

                <Separator orientation="horizontal" />

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Endereço</span>
                  {/* <div
                    className="text-purple-600 text-sm flex items-center gap-2 cursor-pointer hover:underline"
                    // onClick={() => setIsEditing((prevState) => !prevState)}
                  >
                    <PenLine className="w-4 h-4" />
                    Editar
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">CEP</span>
                    <span className="text-sm font-normal text-zinc-500 capitalize">
                      {patientData.cep ?? '-'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Rua ou Avenida</span>
                    <span className="text-sm font-normal text-zinc-500">
                      {patientData.address ?? '-'}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Número</span>
                    <span className="text-sm font-normal text-zinc-500 capitalize">
                      {patientData.number ?? '-'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Complemento</span>
                    <span className="text-sm font-normal text-zinc-500">
                      {patientData.complement ?? '-'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Bairro</span>
                    <span className="text-sm font-normal text-zinc-500 capitalize">
                      {patientData.neighborhood ?? '-'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Cidade</span>
                    <span className="text-sm font-normal text-zinc-500">
                      {}
                      {patientData.city ?? '-'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">Estado</span>
                    <span className="text-sm font-normal text-zinc-500 capitalize">
                      {patientData.state ?? '-'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">País</span>
                    <span className="text-sm font-normal text-zinc-500">
                      {}
                      {patientData.country ?? '-'}
                    </span>
                  </div>
                </div>

                <Button
                  variant={'destructive'}
                  className="mt-4"
                  onClick={() => setOpenDeleteModal((prevState) => !prevState)}
                >
                  <Trash />
                  Remover paciente
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="tab-2">
            <ConsultsNotes patientData={patientData} />
          </TabsContent>
          <TabsContent value="tab-3">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">Mais informações</span>
                <div
                  className="text-purple-600 text-sm flex items-center gap-2 cursor-pointer hover:underline"
                  // onClick={() => setIsEditing((prevState) => !prevState)}
                >
                  <PenLine className="w-4 h-4" />
                  Editar
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Toma medicação</span>
                  <span className="text-sm font-normal text-zinc-500 capitalize">
                    {patientData.takeMedication ? 'Sim' : 'Não'}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Já fez terapia?</span>
                  <span className="text-sm font-normal text-zinc-500">
                    {patientData.hadTherapyBefore ? 'Sim' : 'Não'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Detalhe os medicamentos</span>
                  <span className="text-sm font-normal text-zinc-500 capitalize">
                    {patientData.medicationInfo ?? '-'}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* <TabsComponent /> */}
        <DeletePatient
          open={openDeleteModal}
          patientId={patientData.id}
          setOpen={() => setOpenDeleteModal(!openDeleteModal)}
          key={patientData.id}
        />
      </DialogContent>
    </Dialog>
  )
}
