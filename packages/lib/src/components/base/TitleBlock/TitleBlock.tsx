import { cn } from '../../../utils/cn'
import './TitleBlock.scss'

interface TitleBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title:      string
  subtitle?:  string
  tagline?:   string
  watermark?: string
  className?: string
}

export function TitleBlock({ title, subtitle, tagline, watermark, className, ...rest }: TitleBlockProps) {
  return (
    <div className={cn('kui-titleblock', className)} {...rest}>
      {watermark && <span className="kui-titleblock__watermark" aria-hidden>{watermark}</span>}
      <h1 className="kui-titleblock__title">{title}</h1>
      {subtitle && <p className="kui-titleblock__subtitle">{subtitle}</p>}
      {tagline  && <p className="kui-titleblock__tagline">{tagline}</p>}
    </div>
  )
}
