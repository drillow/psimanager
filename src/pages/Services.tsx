import { CreateUserButton } from "@/components/CreateUserButton"
import { PageHeader } from "@/components/PageHeader"
import { PatientCard } from "@/components/PatientCard"
import { Separator } from "@/components/ui/separator"

export const Services = () => {
  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Consultas"/>
      <div className="flex items-center justify-end">
        <CreateUserButton />
      </div>
      <div className="bg-slate-100 rounded-xl flex w-12/12 h-full p-4 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Segunda</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Terça</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2 overflow-y-scroll">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Quarta</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Quinta</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Sexta</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Sabado</span>
            {/* <span className="font-semibold text-xs text-zinc-700">{format(meetings[0].date, 'do MMM')}</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
            <PatientCard patient={{ name: "Felipe Vieira", time: "11:00" }} />
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Domingo</span>
          </div>
          <div className="flex flex-col gap-2">
           
          </div>
        </div>
      </div>
    </div>
  )
}