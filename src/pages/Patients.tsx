import { CreateUserButton } from "@/components/CreateUserButton"
import { PageHeader } from "@/components/PageHeader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody,  TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, RocketIcon } from "lucide-react"

const mockData = [
  {
    name: "Felipe Vieira Lima",
    cellphone: "(11) 99999-9999",
    hasWhatsApp: true,
    weekDay: "SEG",
    hour: "19:00",
    everyWeek: true
  },
  {
    name: "Felipe Vieira Lima",
    cellphone: "(11) 99999-9999",
    hasWhatsApp: false,
    weekDay: "SEG",
    hour: "19:00",
    everyWeek: true
  },
  {
    name: "Felipe Vieira Lima",
    cellphone: "(11) 99999-9999",
    hasWhatsApp: true,
    weekDay: "SEG",
    hour: "19:00",
    everyWeek: true
  },
  {
    name: "Felipe Vieira Lima",
    cellphone: "(11) 99999-9999",
    hasWhatsApp: true,
    weekDay: "SEG",
    hour: "19:00",
    everyWeek: true
  },
]

export const Patients = () => {
  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <PageHeader pageTitle="Pacientes"/>
      <Alert>
        <RocketIcon className="h-4 w-4"/>
        <AlertTitle>Vamos adicionar pacientes</AlertTitle>
        <AlertDescription>
          Aqui você pode adicionar seus pacientes, podendo dizer os dias, horarios e se tem recorrencia.
        </AlertDescription>
      </Alert>
      <div className="flex items-center justify-end">
        <CreateUserButton />
      </div>
      <Table>
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>Celular</TableHead>
          <TableHead className="text-center">Dia da semana</TableHead>
          <TableHead className="text-center">Horario</TableHead>
          <TableHead className="text-center">Tem WhatsApp?</TableHead>
          <TableHead className="text-center">É recorrente</TableHead>
          <TableHead>Ações</TableHead>
        </TableHeader>
        <TableBody>
          {mockData.map((data) => (
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.cellphone}</TableCell>
              <TableCell className="text-center">{data.weekDay}</TableCell>
              <TableCell className="text-center">{data.hour}</TableCell>
              <TableCell className="text-center">{data.hasWhatsApp ? <Badge className="bg-green-600 hover:bg-green-500">Sim</Badge> : <Badge variant={"destructive"}>Não</Badge>}</TableCell>
              <TableCell className="text-center">{data.everyWeek ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <PencilIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}