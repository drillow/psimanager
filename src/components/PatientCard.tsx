import { Copy, Trash, Edit } from "lucide-react"
import { Badge } from "./ui/badge"

interface PatientCardProps {
  patient: {
    name: string
    time: string
  }
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <Checkbox checked={isCompleted} onCheckedChange={() => setIsCompleted(!isCompleted)}/> */}
          <span className={`font-semibold text-sm text-zinc-700`}>{patient.name}</span>
        </div>
        <span className="text-xs text-zinc-400">{patient.time}</span>
      </div>
      <div className="pb-2 pt-2 flex items-center gap-2">
        <Badge variant={"secondary"}>Presencial</Badge>
        {/* <Badge variant={"secondary"}>Online</Badge> */}
        {/* <span className={`text-xs ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-400'}`}>https://meet.google.com/kjsdai1</span> */}
      </div>
      <div className="w-full flex justify-end gap-2">
        <Edit className="w-4 h-4 text-zinc-500 cursor-pointer"/>
        <Copy className={`w-4 h-4 text-purple-400 cursor-pointer`}/>
        <Trash className={`w-4 h-4 text-red-400 cursor-pointer`}/>
      </div>
    </div>
  )
}