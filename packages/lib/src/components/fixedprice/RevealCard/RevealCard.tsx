import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import './RevealCard.scss'

interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rank:           number
  total?:         number
  name:           string
  initial:        string
  guess:          number | string | null
  correctAnswer?: number | string
  distance?:      number | null
  points?:        number
  unit?:          string
  isWinner?:      boolean
  isMe?:          boolean
  className?:     string
}

export function RevealCard({
  rank,
  total,
  name,
  initial,
  guess,
  distance,
  points,
  unit,
  isWinner = false,
  isMe = false,
  className,
  ...rest
}: RevealCardProps) {
  const shownGuess = guess == null ? '—' : guess
  const shownDist  = distance == null ? null : distance.toLocaleString()

  return (
    <div
      className={cn(
        'kui-revcard',
        isWinner && 'kui-revcard--winner',
        isMe && 'kui-revcard--me',
        className,
      )}
      {...rest}
    >
      <span className="kui-revcard__rank">
        #{total ? rank : rank}
        {isWinner && <span className="kui-revcard__crown" aria-hidden>👑</span>}
      </span>
      <Avatar initial={initial} size="sm" />
      <span className="kui-revcard__name">
        {name}
        {isMe && <span className="kui-revcard__you">you</span>}
      </span>
      <span className="kui-revcard__guess">
        {shownGuess}
        {unit && shownGuess !== '—' && <em>{unit}</em>}
      </span>
      <span className="kui-revcard__distance">
        {shownDist != null ? `off by ${shownDist}` : 'no answer'}
      </span>
      {points != null && points > 0 && (
        <span className="kui-revcard__points">+{points}</span>
      )}
    </div>
  )
}
