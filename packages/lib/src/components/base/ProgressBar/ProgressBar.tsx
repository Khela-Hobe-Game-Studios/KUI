import { cn } from '../../../utils/cn'
import './ProgressBar.scss'

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value:       number
  label?:      string
  showCount?:  boolean
  color?:      string
  className?:  string
}

export function ProgressBar({ value, label, showCount, color, className, style, ...rest }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('kui-progressbar', className)} {...rest}>
      {(label || showCount) && (
        <div className="kui-progressbar__top">
          {label && <span className="kui-progressbar__label">{label}</span>}
          {showCount && <span className="kui-progressbar__count">{clamped}%</span>}
        </div>
      )}
      <div className="kui-progressbar__track">
        <div
          className="kui-progressbar__fill"
          style={{ width: `${clamped}%`, ...(color ? { background: color } : {}), ...style }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
