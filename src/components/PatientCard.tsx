import { PatientPayload } from '@/service/patient/service'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ChevronRight, Mail, Phone } from 'lucide-react'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

type PatientCardProps = {
  data: PatientPayload
}

export const PatientCard: React.FC<PatientCardProps> = ({ data }) => {
  return (
    <Sheet>
      <div key={data.id} className="border border-zinc-200 rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 rounded-full flex items-center justify-center ">
            <AvatarFallback className="h-16 w-16 rounded-xl">
              {data.firstName.split(' ')[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">{`${data.firstName} ${data.lastName}`}</h4>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-normal text-zinc-500">{data.email}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-zinc-500 text-sm font-normal">
            <Phone className="w-h h-4" />
            {data.phoneNumber}
          </span>
          <SheetTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-normal text-violet-600">
              Ver mais
              <ChevronRight className="w-4 h-4" />
            </button>
          </SheetTrigger>
        </div>
      </div>
      <SheetContent className="min-w-[475px]">
        <SheetHeader>
          <SheetTitle>Informação do paciente</SheetTitle>
        </SheetHeader>
        <p>{data.email}</p>
      </SheetContent>
    </Sheet>
  )
}
