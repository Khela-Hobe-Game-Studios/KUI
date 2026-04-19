import { cn } from '../../../utils/cn'
import './Badge.scss'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:   'default' | 'night' | 'day' | 'voting' | 'lobby' | 'success' | 'danger'
  pulse?:     boolean
  className?: string
  children:   React.ReactNode
}

export function Badge({
  variant = 'default',
  pulse = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'kui-badge',
        `kui-badge--${variant}`,
        pulse && 'kui-badge--pulse',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
