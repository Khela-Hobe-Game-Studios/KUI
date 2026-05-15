import { cn } from '../../../utils/cn'
import './StudioCredit.scss'

interface StudioCreditProps extends React.HTMLAttributes<HTMLDivElement> {
  studio:      string
  by?:         string
  glyph?:      React.ReactNode
  fixed?:      boolean
  className?:  string
}

export function StudioCredit({
  studio,
  by = 'A game by',
  glyph = '✦',
  fixed = false,
  className,
  ...rest
}: StudioCreditProps) {
  return (
    <div
      className={cn(
        'kui-studiocredit',
        fixed && 'kui-studiocredit--fixed',
        className,
      )}
      {...rest}
    >
      <div className="kui-studiocredit__rule" aria-hidden>
        <span className="kui-studiocredit__line" />
        <span className="kui-studiocredit__glyph">{glyph}</span>
        <span className="kui-studiocredit__line" />
      </div>
      <span className="kui-studiocredit__by">{by}</span>
      <span className="kui-studiocredit__studio">{studio}</span>
    </div>
  )
}
