import { cn } from '../../../utils/cn'
import './PageBackground.scss'

interface PageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'dark'
  className?: string
}

export function PageBackground({ variant = 'default', className, ...rest }: PageBackgroundProps) {
  return (
    <div
      className={cn('kui-pagebg', `kui-pagebg--${variant}`, className)}
      aria-hidden
      {...rest}
    />
  )
}
