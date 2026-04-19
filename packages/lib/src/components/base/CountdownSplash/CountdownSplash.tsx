import React from 'react'
import { cn } from '../../../utils/cn'
import './CountdownSplash.scss'

interface CountdownSplashProps {
  count:      number
  visible:    boolean
  className?: string
}

export function CountdownSplash({ count, visible, className }: CountdownSplashProps) {
  if (!visible) return null

  return (
    <div
      className={cn('kui-countdown', className)}
      role="status"
      aria-live="assertive"
      aria-label={`Countdown: ${count}`}
    >
      <span key={count} className="kui-countdown__number">
        {count}
      </span>
    </div>
  )
}
