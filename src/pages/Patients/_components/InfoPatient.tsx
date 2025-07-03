import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { Patients } from './TableColumns'

import { ConsultsNotes } from './ConsultsNotes'

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
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal key={key}>
      <SheetContent className="min-w-[475px]">
        <SheetHeader>
          <SheetTitle>Detalhes do paciente</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">Paciente</span>
            <span className="text-sm font-normal text-zinc-500 capitalize">
              {`${patientData.firstName} ${patientData.lastName}`.toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">Idade</span>
              <span className="text-sm font-normal text-zinc-500">{patientData.age} anos</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">Dada de nascimento</span>
              <span className="text-sm font-normal text-zinc-500">23/02/1998</span>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">Celular</span>
              <span className="text-sm font-normal text-zinc-500">{patientData.phoneNumber}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">WhatsApp</span>
              <span className="text-sm font-normal text-zinc-500">Sim</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">E-mail</span>
            <span className="text-sm font-normal text-zinc-500">{patientData.email}</span>
          </div>

          <Separator orientation="horizontal" />
          <ConsultsNotes patientData={patientData} />

          {/* <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Consultas</span>
              <CustomMonthYearPicker patientData={patientData} />
            </div>

            <div className="bg-zinc-100 rounded-lg px-4 py-6 w-full h-full">
              <div className="max-w-full mx-auto">
                <div className="relative">
                  <div className="absolute left-[6px] top-0 bottom-14 w-1 bg-purple-600"></div>

                  <div className="space-y-4">
                    {timelineItems.map((item, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className={`w-4 h-4 rounded-full border-4 bg-purple-600 border-purple-600 flex items-center justify-center`}
                          ></div>
                        </div>

                        <div className={`ml-4 ${index !== timelineItems.length - 1 ? 'pb-4' : ''}`}>
                          <div className="text-gray-800 text-xs font-semibold mb-2 flex items-center justify-between">
                            {item.date}
                            <div
                              className="text-purple-600 text-xs flex items-center gap-1 cursor-pointer hover:underline"
                              onClick={() => setSelectedConsult(item)}
                            >
                              Editar
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          <p className="text-gray-800 text-sm  max-w-2xl">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
