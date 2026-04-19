import React from 'react'
import { cn } from '../../../utils/cn'
import type { CpdbPhase } from '../../../types'
import './PhaseTransition.scss'

const PHASE_META: Record<CpdbPhase, { emoji: string; label: string }> = {
  lobby:   { emoji: '🏠', label: 'Lobby'   },
  night:   { emoji: '🌙', label: 'Night'   },
  day:     { emoji: '☀️', label: 'Day'     },
  voting:  { emoji: '🗳️', label: 'Voting'  },
  results: { emoji: '📋', label: 'Results' },
}

interface PhaseTransitionProps {
  phase:      CpdbPhase
  visible:    boolean
  className?: string
}

export function PhaseTransition({ phase, visible, className }: PhaseTransitionProps) {
  const { emoji, label } = PHASE_META[phase]
  return (
    <div
      className={cn('kui-phasetrans', `kui-phasetrans--${phase}`, visible && 'kui-phasetrans--visible', className)}
      aria-hidden={!visible}
      role="status"
      aria-live="assertive"
    >
      <div className="kui-phasetrans__inner">
        <span className="kui-phasetrans__emoji" aria-hidden="true">{emoji}</span>
        <span className="kui-phasetrans__label">{label}</span>
      </div>
    </div>
  )
}
