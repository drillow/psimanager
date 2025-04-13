import { BellDot } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled>
        <BellDot className="w-5 h-5 text-zinc-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 h-96 mt-2 mr-4">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2 p-2">
          <div className="flex gap-2">
            <div className="w-1/12 pt-1.5 flex items-start justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Uma nova notificação</span>
              <p className="text-xs">
                Sua consulta com Felipe Vieira acaba de ser confirmada
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <div className="w-1/12 pt-1.5 flex items-start justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Uma nova notificação</span>
              <p className="text-xs">
                Sua consulta com Felipe Vieira acaba de ser confirmada
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <div className="w-1/12 pt-1.5 flex items-start justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Uma nova notificação</span>
              <p className="text-xs">
                Sua consulta com Felipe Vieira acaba de ser confirmada
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <div className="w-1/12 pt-1.5 flex items-start justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Uma nova notificação</span>
              <p className="text-xs">
                Sua consulta com Felipe Vieira acaba de ser confirmada
              </p>
            </div>
          </div>
          <Separator />
        </div>
        {/* <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs text-zinc-300">Sem notifições</span>
        </div> */}
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
