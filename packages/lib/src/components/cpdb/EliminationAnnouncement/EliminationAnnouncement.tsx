import React from 'react'
import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import type { CpdbRole } from '../../../types'
import './EliminationAnnouncement.scss'

const ROLE_LABEL: Record<CpdbRole, string> = {
  chor:   'was Chor 🔴',
  police: 'was Police 🔵',
  daktar: 'was Daktar 💚',
  babu:   'was Babu ⬜',
}

interface EliminationAnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
  playerName:    string
  playerInitial: string
  role:          CpdbRole
  animated?:     boolean
  className?:    string
}

export function EliminationAnnouncement({ playerName, playerInitial, role, animated = false, className, ...rest }: EliminationAnnouncementProps) {
  return (
    <div
      className={cn('kui-elimination', `kui-elimination--${role}`, animated && 'kui-elimination--animated', className)}
      {...rest}
    >
      <div className="kui-elimination__avatar-wrap">
        <Avatar initial={playerInitial} size="xl" />
      </div>
      <div className="kui-elimination__body">
        <p className="kui-elimination__name">{playerName}</p>
        <p className="kui-elimination__badge">Eliminated</p>
        <p className="kui-elimination__role">{ROLE_LABEL[role]}</p>
      </div>
    </div>
  )
}
