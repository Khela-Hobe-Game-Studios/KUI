import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import type { LeaderboardEntry } from '../../../types'
import './MiniLeaderboard.scss'

interface MiniLeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  players:          LeaderboardEntry[]
  currentPlayerId?: string
  maxShow?:         number
  className?:       string
}

export function MiniLeaderboard({
  players,
  currentPlayerId,
  maxShow = 5,
  className,
  ...rest
}: MiniLeaderboardProps) {
  const top = players.slice(0, maxShow)
  const selfInTop = currentPlayerId
    ? top.some(p => p.id === currentPlayerId)
    : true
  const self = !selfInTop && currentPlayerId
    ? players.find(p => p.id === currentPlayerId)
    : undefined

  return (
    <div className={cn('kui-mini', className)} {...rest}>
      {top.map(p => (
        <Row key={p.id} entry={p} isSelf={p.id === currentPlayerId} />
      ))}
      {self && (
        <>
          <div className="kui-mini__divider" aria-hidden>· · ·</div>
          <Row entry={self} isSelf />
        </>
      )}
    </div>
  )
}

function Row({ entry, isSelf }: { entry: LeaderboardEntry; isSelf: boolean }) {
  return (
    <div
      className={cn(
        'kui-mini__row',
        isSelf && 'kui-mini__row--me',
        entry.eliminated && 'kui-mini__row--eliminated',
      )}
    >
      <span className="kui-mini__rank">#{entry.rank}</span>
      <Avatar initial={entry.initial} size="sm" />
      <span className="kui-mini__name">{isSelf ? `${entry.name} (you)` : entry.name}</span>
      <span className="kui-mini__score">{entry.score}</span>
    </div>
  )
}
