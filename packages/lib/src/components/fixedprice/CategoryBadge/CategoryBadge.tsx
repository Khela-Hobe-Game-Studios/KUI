import { cn } from '../../../utils/cn'
import type { FpCategory } from '../../../types'
import './CategoryBadge.scss'

interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category:   FpCategory
  className?: string
}

const LABELS: Record<FpCategory, string> = {
  desh:    '🇧🇩 দেশ',
  cricket: '🏏 Cricket',
  taka:    '💰 Taka',
  global:  '🌍 Global',
  weird:   '🌀 Weird',
}

export function CategoryBadge({ category, className, ...rest }: CategoryBadgeProps) {
  return (
    <span
      className={cn('kui-catbadge', `kui-catbadge--${category}`, className)}
      {...rest}
    >
      {LABELS[category]}
    </span>
  )
}
