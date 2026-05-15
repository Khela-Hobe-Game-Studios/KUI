import { cn } from '../../../utils/cn'
import { CategoryBadge } from '../CategoryBadge'
import type { FpCategory } from '../../../types'
import './QuestionCard.scss'

interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question:   string
  unit?:      string
  category?:  FpCategory
  round?:     number
  total?:     number
  className?: string
}

export function QuestionCard({
  question,
  unit,
  category,
  round,
  total,
  className,
  ...rest
}: QuestionCardProps) {
  return (
    <div className={cn('kui-qcard', className)} {...rest}>
      <div className="kui-qcard__meta">
        {category && <CategoryBadge category={category} />}
        {round != null && (
          <span className="kui-qcard__round">
            Round {round}{total ? ` / ${total}` : ''}
          </span>
        )}
      </div>
      <h2 className="kui-qcard__question">{question}</h2>
      {unit && (
        <p className="kui-qcard__unit">
          Answer in <strong>{unit}</strong>
        </p>
      )}
    </div>
  )
}
