import React from 'react'
import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import type { VoteTallyEntry } from '../../../types'
import './VoteTally.scss'

interface VoteTallyProps extends React.HTMLAttributes<HTMLDivElement> {
  nominations: VoteTallyEntry[]
  totalVoters: number
  className?:  string
}

export function VoteTally({ nominations, totalVoters, className, ...rest }: VoteTallyProps) {
  const sorted = [...nominations].sort((a, b) => b.votes - a.votes)

  return (
    <div className={cn('kui-votetally', className)} {...rest}>
      {sorted.map(n => {
        const pct = totalVoters > 0 ? Math.round((n.votes / totalVoters) * 100) : 0
        return (
          <div key={n.playerId} className={cn('kui-votetally__row', n.isLeading && 'kui-votetally__row--leading')}>
            <Avatar initial={n.initial} size="sm" />
            <span className="kui-votetally__name">{n.name}</span>
            <div className="kui-votetally__bar-track">
              <div
                className="kui-votetally__bar-fill"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="kui-votetally__count">{n.votes}</span>
          </div>
        )
      })}
    </div>
  )
}
