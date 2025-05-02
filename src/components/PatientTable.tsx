import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCellphone } from "@/utils/masks/phone_mask"
import { Badge } from "./ui/badge"
import { EditPatientButton } from "./EditButtonPatient"
import { DeletePatient } from "./DeletePatientButton"
import { PatientPayload } from "@/service/patient/service"
import { Button } from "./ui/button"
import { useState } from "react"
import { Input } from "./ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export const columns: ColumnDef<PatientPayload>[] = [
  {
    accessorKey: 'firstName',
    header: 'Nome',
    cell: ({ row }) => {
      return `${row.original.firstName} ${row.original.lastName}`
    }
  },
  {
    accessorKey: 'patientId',
    header: 'ID do Paciente'
  },
  {
    accessorKey: 'age',
    header: 'Idade'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Celular',
    cell: ({ row }) => {
      return formatCellphone(row.getValue("phoneNumber"))
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'isWhatsApp',
    header: 'WhatsApp',
    cell: ({ row }) => {
      return row.getValue("isWhatsApp") ? (
        <Badge className="bg-green-100 text-green-600 hover:bg-green-100 rounded-md shadow-none antialiased">
          Sim
        </Badge>
      ) : (
        <Badge variant={'destructive'} className='bg-red-200 text-red-600 hover:bg-red-200 antialiased shadow-none'>Não</Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="max-w-[100px]">
          <EditPatientButton patientData={row.original} />
          <DeletePatient patientId={row.original.id!} />
        </div>
      )
    }
  }
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })
 
  return (
    <div>
      <div className="flex items-center py-4">
        <div className="relative flex items-center w-2/12">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Buscar por nome"
            value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="pl-8"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>

  )
}