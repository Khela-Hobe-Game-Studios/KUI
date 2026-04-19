import { cn } from '../../../utils/cn'
import './LoadingDot.scss'

interface LoadingDotProps extends React.HTMLAttributes<HTMLDivElement> {
  message?:   string
  subtext?:   string
  className?: string
}

export function LoadingDot({ message = 'Waiting…', subtext, className, ...rest }: LoadingDotProps) {
  return (
    <div className={cn('kui-loadingdot', className)} {...rest}>
      <span className="kui-loadingdot__dot" aria-hidden />
      <span className="kui-loadingdot__message">{message}</span>
      {subtext && <span className="kui-loadingdot__subtext">{subtext}</span>}
    </div>
  )
}
