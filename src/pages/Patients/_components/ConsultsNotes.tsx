import { ArrowLeft, ArrowRight, Save } from 'lucide-react'
import { CustomMonthYearPicker } from './MonthYearPicker'
import { useAuth } from '@/context/auth'
import { useGetConsultNotes } from '@/service/consults/hooks'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { cx } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { Patients } from './TableColumns'

type Note = {
  id: string
  date: string
  note: string
}

type ConsultNotesType = {
  patientData: Patients
}

export const ConsultsNotes: React.FC<ConsultNotesType> = ({ patientData }) => {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [selectedMonth, setSelectedMonth] = useState<string>('06')
  const [selectedYear, setSelectedYear] = useState<string>('2025')
  const [selectedConsultNote, setSelectedConsultNote] = useState<Note | null>(null)

  const setSelectedConsult = (item: Note) => {
    setSelectedConsultNote(item)
    setTextAreaValue(item.note)
  }

  const { user } = useAuth()

  const { data } = useGetConsultNotes(
    user.id,
    patientData.id,
    `${(Number(selectedMonth) + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}-${selectedYear}`,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">Consultas</span>
        <CustomMonthYearPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="bg-zinc-100 rounded-lg px-4 py-6 w-full h-full max-h-[550px] overflow-scroll">
        {data?.data?.notes?.length === 0 ? (
          <p className="w-full text-center text-sm font-medium text-zinc-700">
            Não existem notas para as consultas do mês selecionado. Adicione ao concluir a consulta{' '}
            <a href="/weekly-consults" className="text-violet-600 cursor-pointer">
              aqui
            </a>
          </p>
        ) : (
          <>
            {selectedConsultNote ? (
              <div className="flex flex-col gap-4">
                <span className="font-bold text-sm flex items-center gap-2">
                  <ArrowLeft
                    width={20}
                    height={20}
                    className="text-violet-700 cursor-pointer"
                    onClick={() => setSelectedConsultNote(null)}
                  />
                  {format(parseISO(selectedConsultNote?.date), 'dd MMM, yyyy')}
                </span>
                <textarea
                  className={cx(
                    `w-full h-96 p-2 border border-zinc-300 rounded-md resize-none focus:outline-none  cursor-text text-black focus:ring-2 focus:ring-violet-500`,
                  )}
                  placeholder="Escreva suas anotações aqui..."
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                ></textarea>

                <Button type="button" onClick={() => {}} disabled={false} className="w-full">
                  <Save />
                  Salvar
                </Button>
              </div>
            ) : (
              <div className="max-w-full mx-auto">
                <div className="relative">
                  {/* Vertical line - stops at the last item */}
                  <div className="absolute left-[6px] top-0 bottom-16 w-1 bg-purple-600"></div>

                  {/* Timeline items */}
                  <div className="space-y-4">
                    {data?.data?.notes?.map((item: Note, index: number) => (
                      <div key={index} className="relative flex items-start">
                        {/* Timeline marker */}
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className={`w-4 h-4 rounded-full border-4 bg-purple-600 border-purple-600 flex items-center justify-center`}
                          ></div>
                        </div>

                        <div
                          className={`w-full ml-4 ${index !== data?.data?.notes?.length - 1 ? 'pb-4' : ''}`}
                        >
                          <div className="text-gray-800 text-sm font-semibold mb-2 flex items-center justify-between">
                            {format(parseISO(item.date), 'dd MMM, yyyy')}
                            <div
                              className="text-purple-600 text-xs flex items-center gap-1 cursor-pointer hover:underline"
                              onClick={() => setSelectedConsult(item)}
                            >
                              Editar
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          <p className="text-gray-800 text-sm  max-w-2xl line-clamp-2">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
