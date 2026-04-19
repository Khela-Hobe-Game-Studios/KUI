import { cn } from '../../../utils/cn'
import { Avatar } from '../Avatar'
import './WinnerDisplay.scss'

interface WinnerEntry { name: string; initial: string; score?: number }

interface WinnerDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  winners:    WinnerEntry[]
  animated?:  boolean
  className?: string
}

export function WinnerDisplay({ winners, animated = true, className, ...rest }: WinnerDisplayProps) {
  return (
    <div className={cn('kui-winner', animated && 'kui-winner--animated', className)} {...rest}>
      <span className="kui-winner__label">Winner</span>
      {winners.map((w, i) => (
        <div key={i} className="kui-winner__entry">
          <Avatar initial={w.initial} size="xl" isWinner />
          <span className="kui-winner__name">{w.name}</span>
          {w.score != null && <span className="kui-winner__score">{w.score}</span>}
        </div>
      ))}
    </div>
  )
}
