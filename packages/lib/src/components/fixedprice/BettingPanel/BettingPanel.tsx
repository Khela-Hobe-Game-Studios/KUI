import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import './BettingPanel.scss'

export interface BetOption {
  id:      string
  name:    string
  initial: string
  score:   number
  rank:    number
}

interface BettingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  options:      BetOption[]
  selectedBet?: string
  onBet:        (id: string) => void
  className?:   string
}

export function BettingPanel({
  options,
  selectedBet,
  onBet,
  className,
  ...rest
}: BettingPanelProps) {
  return (
    <div className={cn('kui-betpanel', className)} {...rest}>
      {options.map(opt => {
        const isSelected = selectedBet === opt.id
        return (
          <button
            type="button"
            key={opt.id}
            className={cn(
              'kui-betpanel__row',
              isSelected && 'kui-betpanel__row--selected',
            )}
            onClick={() => onBet(opt.id)}
            aria-pressed={isSelected}
          >
            <span className="kui-betpanel__rank">#{opt.rank}</span>
            <Avatar initial={opt.initial} size="sm" />
            <span className="kui-betpanel__name">{opt.name}</span>
            <span className="kui-betpanel__score">{opt.score}</span>
            <span className="kui-betpanel__check" aria-hidden>
              {isSelected ? '✓' : ''}
            </span>
          </button>
        )
      })}
    </div>
  )
}
