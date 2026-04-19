import React from 'react'
import { cn } from '../../../utils/cn'
import './PulseRing.scss'

interface PulseRingProps extends React.HTMLAttributes<HTMLDivElement> {
  active?:    boolean
  color?:     string
  children:   React.ReactNode
  className?: string
}

export function PulseRing({ active = false, color, children, className, style, ...rest }: PulseRingProps) {
  return (
    <div
      className={cn('kui-pulsering', active && 'kui-pulsering--active', className)}
      style={{ ...(color ? { '--kui-pulse-color': color } as React.CSSProperties : {}), ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}
