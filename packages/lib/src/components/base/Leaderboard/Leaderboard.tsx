import { cn } from '../../../utils/cn'
import { Avatar } from '../Avatar'
import type { LeaderboardEntry } from '../../../types'
import './Leaderboard.scss'

interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  players:    LeaderboardEntry[]
  maxShow?:   number
  className?: string
}

export function Leaderboard({ players, maxShow, className, ...rest }: LeaderboardProps) {
  const visible = maxShow ? players.slice(0, maxShow) : players
  return (
    <div className={cn('kui-leaderboard', className)} {...rest}>
      {visible.map(p => (
        <div
          key={p.id}
          className={cn(
            'kui-leaderboard__row',
            p.isMe && 'kui-leaderboard__row--me',
            p.eliminated && 'kui-leaderboard__row--eliminated',
          )}
        >
          <span className="kui-leaderboard__rank">#{p.rank}</span>
          <Avatar initial={p.initial} size="sm" />
          <span className="kui-leaderboard__name">{p.name}</span>
          <span className="kui-leaderboard__score">{p.score}</span>
        </div>
      ))}
    </div>
  )
}
