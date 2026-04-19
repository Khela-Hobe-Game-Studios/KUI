import { cn } from '../../../utils/cn'
import { Avatar } from '../Avatar'
import './PlayerCard.scss'

interface PlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name:       string
  initial:    string
  status?:    'waiting' | 'answered' | 'locked' | 'eliminated'
  isMe?:      boolean
  color?:     string
  variant?:   'grid' | 'list'
  className?: string
}

export function PlayerCard({
  name,
  initial,
  status = 'waiting',
  isMe = false,
  color,
  variant = 'list',
  className,
  ...rest
}: PlayerCardProps) {
  return (
    <div
      className={cn(
        'kui-playercard',
        `kui-playercard--${variant}`,
        `kui-playercard--${status}`,
        isMe && 'kui-playercard--me',
        className,
      )}
      {...rest}
    >
      <Avatar initial={initial} size="md" color={color} />
      <span className="kui-playercard__name">{name}</span>
      {isMe && <span className="kui-playercard__you">You</span>}
      {status === 'answered' && <span className="kui-playercard__check" aria-hidden>✓</span>}
    </div>
  )
}
