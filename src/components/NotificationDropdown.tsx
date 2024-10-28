import { BellDot } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellDot className="w-5 h-5"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 h-96 mt-2 mr-4">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs text-zinc-300">Sem notifições</span>
        </div>
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