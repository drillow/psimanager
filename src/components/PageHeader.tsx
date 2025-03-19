import { format } from 'date-fns'
import { NotificationDropdown } from './NotificationDropdown'
import { SidebarTrigger } from './ui/sidebar'
import { UserMenu } from './UserMenu'
import { UserButton } from '@clerk/clerk-react'

interface PageHeaderProps {
  pageTitle: string
  hasToggleSidebar?: boolean
  showCurrentDay?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  hasToggleSidebar = false,
  showCurrentDay = false,
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        {hasToggleSidebar && <SidebarTrigger />}
        <h1 className="text-2xl font-semibold text-zinc-700 rounded">
          {pageTitle}
        </h1>
        {showCurrentDay && (
          <span className="text-xl font-semibold text-zinc-400 ml-2">
            {format(new Date(), "'Hoje é' eeee, dd 'de' MMMM 'de' yyyy")}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <UserMenu />
        {/* <UserButton
          appearance={{
            elements: {
              button: { borderRadius: 8 },
              avatarBox: { borderRadius: 8 },
            },
          }}
        /> */}
      </div>
    </div>
  )
}
