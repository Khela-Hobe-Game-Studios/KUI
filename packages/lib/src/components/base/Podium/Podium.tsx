import { cn } from '../../../utils/cn'
import { Avatar } from '../Avatar'
import './Podium.scss'

interface PodiumEntry { rank: 1 | 2 | 3; name: string; initial: string; score: number }

interface PodiumProps extends React.HTMLAttributes<HTMLDivElement> {
  winners:    PodiumEntry[]
  className?: string
}

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' }
const ORDER  = [2, 1, 3] as const

export function Podium({ winners, className, ...rest }: PodiumProps) {
  const byRank = Object.fromEntries(winners.map(w => [w.rank, w]))
  return (
    <div className={cn('kui-podium', className)} {...rest}>
      {ORDER.map(rank => {
        const w = byRank[rank]
        if (!w) return null
        return (
          <div key={rank} className={`kui-podium__slot kui-podium__slot--${rank}`}>
            <Avatar initial={w.initial} size={rank === 1 ? 'lg' : 'md'} isWinner={rank === 1} />
            <span className="kui-podium__medal">{MEDALS[rank]}</span>
            <span className="kui-podium__name">{w.name}</span>
            <span className="kui-podium__score">{w.score}</span>
            <div className="kui-podium__block" />
          </div>
        )
      })}
    </div>
  )
}
