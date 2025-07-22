import { ExternalLink } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Link } from 'react-router-dom'
import { cx } from 'class-variance-authority'

interface WIdgetCardLinkProps {
  title: string
  description: string
  icon: React.ReactNode
  hasBadge?: boolean
  badgeText?: string
  toPath?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  disabled?: boolean
}

export const WidgetCardLink: React.FC<WIdgetCardLinkProps> = ({
  description,
  icon,
  title,
  hasBadge = false,
  badgeText = 'Text',
  toPath,
  badgeVariant,
  disabled = false,
}) => {
  if (toPath) {
    return (
      <Link
        to={toPath}
        className={cx(
          `border border-zinc-200 rounded-xl w-full min-h-[245px] p-4 flex flex-col justify-between bg-white `,
          disabled ? '' : 'animated-card',
        )}
      >
        <div className="flex items-start justify-between">
          <div className="w-20 h-20 rounded-xl border border-zinc-200 flex items-center justify-center">
            {icon}
          </div>
          <ExternalLink className="text-violet-500" />
        </div>
        <div className="flex flex-col gap-2">
          {hasBadge && (
            <Badge
              className="flex items-center justify-center w-5/12"
              variant={badgeVariant || 'default'}
            >
              {badgeText}
            </Badge>
          )}
          <span className="text-lg font-semibold text-zinc-600">{title}</span>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </Link>
    )
  }
  return (
    <div
      className={cx(
        `border border-zinc-200 rounded-xl w-full min-h-[245px] p-4 flex flex-col justify-between bg-white `,
        disabled ? 'opacity-60' : 'animated-card',
      )}
    >
      <div className="w-full flex items-start justify-between">
        <div className="w-20 h-20 rounded-xl border border-zinc-200 flex items-center justify-center">
          {icon}
        </div>
        <ExternalLink className="text-violet-500" />
      </div>
      <div className="flex flex-col items-start gap-2">
        {hasBadge && <Badge className="flex items-center justify-center w-5/12">{badgeText}</Badge>}
        <span className="text-lg font-semibold text-zinc-600">{title}</span>
        <p className="text-sm text-zinc-400 h-10">{description}</p>
      </div>
    </div>
  )
}
