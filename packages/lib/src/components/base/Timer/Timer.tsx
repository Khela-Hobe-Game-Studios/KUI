import { cn } from '../../../utils/cn'
import './Timer.scss'

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds:       number
  totalSeconds?: number
  color?:        string
  size?:         'sm' | 'md' | 'lg'
  className?:    string
}

export function Timer({ seconds, size = 'md', color, className, style, ...rest }: TimerProps) {
  const urgent = seconds <= 5
  return (
    <div
      className={cn('kui-timer', `kui-timer--${size}`, urgent && 'kui-timer--urgent', className)}
      style={color ? { ...style, color } : style}
      role="timer"
      aria-live="polite"
      {...rest}
    >
      {seconds}
    </div>
  )
}
