import { Copy } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"

interface CardProps {
  patient: {
    name: string
    time: string
  }
  isCompled?: boolean
}

export const Card: React.FC<CardProps> = ({ patient, isCompled = false}) => {
  const [isCompleted, setIsCompleted] = useState(isCompled)

  return (
    <div className="p-2 bg-white rounded-lg border border-zinc-200 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={isCompleted} onCheckedChange={() => setIsCompleted(!isCompleted)}/>
          <span className={`font-semibold text-sm ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-700'}`}>{patient.name}</span>
        </div>
        <span className="text-xs text-zinc-400">{patient.time}</span>
      </div>
      <div className="pb-4 pt-4">
        <span className={`text-xs ${isCompleted ? 'line-through text-zinc-300' : 'text-zinc-400'}`}>https://meet.google.com/kjsdai1</span>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Copy className={`w-4 h-4 ${isCompleted ? 'text-zinc-400' : 'text-purple-400 cursor-pointer'}`}/>
      </div>
    </div>
  )
}