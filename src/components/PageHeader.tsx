import { NotificationDropdown } from "./NotificationDropdown"
import { UserMenu } from "./UserMenu"

interface PageHeaderProps {
  pageTitle: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-zinc-700 rounded">{pageTitle}</h1>
      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <UserMenu />
      </div>
    </div>
  )
}