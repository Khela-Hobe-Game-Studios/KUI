import React from 'react'
import { cn } from '../../../utils/cn'
import type { CpdbRole, CpdbPhase } from '../../../types'
import './ActionPrompt.scss'

const PHASE_EMOJI: Record<CpdbPhase, string> = {
  lobby:   '🏠',
  night:   '🌙',
  day:     '☀️',
  voting:  '🗳️',
  results: '📋',
}

interface ActionPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  phase:      CpdbPhase
  role:       CpdbRole
  message:    string
  subtext?:   string
  className?: string
}

export function ActionPrompt({ phase, role, message, subtext, className, ...rest }: ActionPromptProps) {
  return (
    <div className={cn('kui-actionprompt', `kui-actionprompt--${role}`, className)} {...rest}>
      <span className="kui-actionprompt__icon" aria-hidden="true">{PHASE_EMOJI[phase]}</span>
      <div className="kui-actionprompt__body">
        <p className="kui-actionprompt__message">{message}</p>
        {subtext && <p className="kui-actionprompt__subtext">{subtext}</p>}
      </div>
    </div>
  )
}
