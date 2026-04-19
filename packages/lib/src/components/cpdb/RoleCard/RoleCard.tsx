import React from 'react'
import { cn } from '../../../utils/cn'
import type { CpdbRole } from '../../../types'
import './RoleCard.scss'

const ROLE_EMOJI: Record<CpdbRole, string> = {
  chor:   '🔴',
  police: '🔵',
  daktar: '💚',
  babu:   '⬜',
}

const ROLE_LABEL: Record<CpdbRole, string> = {
  chor:   'Chor',
  police: 'Police',
  daktar: 'Daktar',
  babu:   'Babu',
}

interface RoleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  role:       CpdbRole
  playerName: string
  revealed?:  boolean
  className?: string
}

export function RoleCard({ role, playerName, revealed = false, className, ...rest }: RoleCardProps) {
  return (
    <div className={cn('kui-rolecard', revealed && 'kui-rolecard--revealed', className)} {...rest}>
      <div className="kui-rolecard__inner">
        <div className="kui-rolecard__front">
          <span className="kui-rolecard__mystery">?</span>
          <span className="kui-rolecard__label">Your Role</span>
        </div>
        <div className={cn('kui-rolecard__back', `kui-rolecard__back--${role}`)}>
          <span className="kui-rolecard__emoji">{ROLE_EMOJI[role]}</span>
          <span className="kui-rolecard__role-name">{ROLE_LABEL[role]}</span>
          <span className="kui-rolecard__player">{playerName}</span>
        </div>
      </div>
    </div>
  )
}
