import { cn } from '../../../utils/cn'
import './RoomCode.scss'

interface RoomCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  code:       string
  label?:     string
  size?:      'sm' | 'lg'
  className?: string
}

export function RoomCode({
  code,
  label = 'Room Code',
  size = 'lg',
  className,
  ...rest
}: RoomCodeProps) {
  return (
    <div className={cn('kui-roomcode', `kui-roomcode--${size}`, className)} {...rest}>
      <span className="kui-roomcode__label">{label}</span>
      <span className="kui-roomcode__code">{code}</span>
    </div>
  )
}
