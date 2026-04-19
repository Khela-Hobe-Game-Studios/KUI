import { cn } from '../../../utils/cn'
import './Avatar.scss'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initial:    string
  size?:      'sm' | 'md' | 'lg' | 'xl'
  color?:     string
  isWinner?:  boolean
  className?: string
}

export function Avatar({
  initial,
  size = 'md',
  color,
  isWinner = false,
  className,
  style,
  ...rest
}: AvatarProps) {
  return (
    <div
      className={cn(
        'kui-avatar',
        `kui-avatar--${size}`,
        isWinner && 'kui-avatar--winner',
        className,
      )}
      style={color ? { ...style, backgroundColor: color } : style}
      aria-label={initial}
      {...rest}
    >
      {initial.charAt(0).toUpperCase()}
    </div>
  )
}
