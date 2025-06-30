import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Patients } from './TableColumns'
import { Input } from '@/components/ui/input'

type InfoPatientProps = {
  open: boolean
  patientData: Patients
  onOpenChange: (open: boolean) => void
}

type Note = {
  date: string
  title: string
  description: string
}

const timelineItems: Note[] = [
  {
    date: 'Mar 15, 2024',
    title: 'Project Kickoff',
    description:
      'Initial team meeting and project scope definition. Established key milestones and resource allocation.',
  },
  {
    date: 'Mar 22, 2024',
    title: 'Design Phase',
    description:
      'Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.',
  },
  {
    date: 'Apr 5, 2024',
    title: 'Development Sprint',
    description: 'Backend API implementation and frontend component development in progress.',
  },
  {
    date: 'Apr 19, 2024',
    title: 'Testing & Deployment',
    description:
      'Quality assurance testing, performance optimization, and production deployment preparation.',
  },
]

export const InfoPatient: React.FC<InfoPatientProps> = ({ open, onOpenChange, patientData }) => {
  const [selectedConsult, setSelectedConsult] = useState<Note | null>(null)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[475px]">
        <SheetHeader>
          <SheetTitle>Detalhes do paciente</SheetTitle>
        </SheetHeader>
        {!selectedConsult ? (
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

            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Consultas</span>
              <Input className="w-44" />
            </div>

            <div className="bg-zinc-100 rounded-lg px-4 py-6 w-full h-full">
              <div className="max-w-full mx-auto">
                <div className="relative">
                  {/* Vertical line - stops at the last item */}
                  <div className="absolute left-[6px] top-0 bottom-14 w-1 bg-purple-600"></div>

                  {/* Timeline items */}
                  <div className="space-y-4">
                    {timelineItems.map((item, index) => (
                      <div key={index} className="relative flex items-start">
                        {/* Timeline marker */}
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
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <span
              className="text-purple-600 text-xs flex items-center gap-1 cursor-pointer hover:underline font-semibold w-2/12"
              onClick={() => setSelectedConsult(null)}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </span>
            <textarea
              className="w-full h-60 p-2 border border-zinc-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Anotações sobre a consulta..."
              defaultValue={selectedConsult.description}
            ></textarea>
            <div className="flex items-center justify-end">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Salvar
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
