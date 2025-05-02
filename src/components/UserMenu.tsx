import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useAuth } from '@/context/auth'
import { Settings } from '@/pages/Settings'
import { LogOut, SettingsIcon } from 'lucide-react'
import { SidebarMenuButton } from './ui/sidebar'
import { useGetProfileImage } from '@/service/person/hooks'

export const UserMenu = () => {
  const { signOut, user } = useAuth()
  const { data, isLoading } = useGetProfileImage(user.id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 rounded-md flex items-center justify-center">
          {!isLoading && data?.profileUrl ? 
            <AvatarImage src={data.profileUrl} alt={data?.profileUrl} /> 
          :
            <AvatarFallback className='h-16 w-16 rounded-xl'>{user.name.split(' ')[0].charAt(0)}</AvatarFallback>
          }
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Settings>
              <SidebarMenuButton>
                <SettingsIcon />
                <span>Configurações</span>
              </SidebarMenuButton>
            </Settings>
            {/* <Link to={'/settings'}>
              Configurações */}
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            {/* </Link> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="text-red-400" onClick={() => signOut()}>
          {/* <div>÷ */}
          <LogOut />
          Log out
          {/* </div> */}
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
