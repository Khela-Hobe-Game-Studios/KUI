import React, { useMemo } from 'react'
import { cn } from '../../../utils/cn'
import './ConfettiBurst.scss'

interface ConfettiBurstProps {
  active:     boolean
  count?:     number
  className?: string
}

const COLORS = [
  '#ff9a9e', '#fbc2eb', '#a1c4fd', '#c2e9fb',
  '#d4fc79', '#96e6a1', '#fddb92', '#f6d365',
  '#fda085', '#d1fdff', '#a6c1ee', '#ffecd2',
]

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export function ConfettiBurst({ active, count = 40, className }: ConfettiBurstProps) {
  const pieces = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id:                i,
      left:              `${sr(i * 3) * 100}%`,
      animationDelay:    `${sr(i * 7) * 1.2}s`,
      animationDuration: `${0.9 + sr(i * 11) * 1.2}s`,
      color:             COLORS[i % COLORS.length],
      width:             `${6 + Math.round(sr(i * 13) * 7)}px`,
      height:            `${8 + Math.round(sr(i * 17) * 5)}px`,
      rotate:            `${Math.round(sr(i * 19) * 360)}deg`,
    }))
  ), [count])

  if (!active) return null

  return (
    <div className={cn('kui-confetti', className)} aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="kui-confetti__piece"
          style={{
            left:              p.left,
            animationDelay:    p.animationDelay,
            animationDuration: p.animationDuration,
            backgroundColor:   p.color,
            width:             p.width,
            height:            p.height,
            '--r':             p.rotate,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
