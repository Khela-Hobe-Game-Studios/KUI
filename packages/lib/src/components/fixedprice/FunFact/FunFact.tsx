import { cn } from '../../../utils/cn'
import './FunFact.scss'

interface FunFactProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text:       string
  label?:     string
  className?: string
}

export function FunFact({ text, label = '💡 Fun fact', className, ...rest }: FunFactProps) {
  return (
    <p className={cn('kui-funfact', className)} {...rest}>
      <span className="kui-funfact__label">{label}</span>
      <span className="kui-funfact__text">{text}</span>
    </p>
  )
}
