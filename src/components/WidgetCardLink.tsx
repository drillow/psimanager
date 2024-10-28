import { ExternalLink } from "lucide-react"
import { Badge } from "./ui/badge"
import { Link } from "react-router-dom"

interface WIdgetCardLinkProps {
  title: string
  description: string
  icon: React.ReactNode
  hasBadge?: boolean
  badgeText?: string
  toPath: string
}

export const WidgetCardLink: React.FC<WIdgetCardLinkProps> = ({ description, icon, title, hasBadge = false, badgeText = "Text", toPath }) => {
  return (
    <Link to={toPath} className="border border-zinc-200 rounded-xl w-full h-full p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="w-20 h-20 rounded-xl border border-zinc-200 flex items-center justify-center">
          {icon}
        </div>
        <ExternalLink className="text-purple-500"/>
      </div>
      <div className="flex flex-col gap-2">
        {hasBadge && <Badge className="flex items-center justify-center w-5/12">{badgeText}</Badge>}
        <span className="text-lg font-semibold text-zinc-700">{title}</span>
        <p className="text-xs text-zinc-400 h-8">{description}</p>
      </div>
    </Link>
  )
}