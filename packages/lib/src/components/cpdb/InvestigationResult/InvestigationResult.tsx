import React from 'react'
import { cn } from '../../../utils/cn'
import { Avatar } from '../../base/Avatar'
import './InvestigationResult.scss'

interface InvestigationResultProps extends React.HTMLAttributes<HTMLDivElement> {
  targetName:    string
  targetInitial: string
  isChor:        boolean
  animated?:     boolean
  className?:    string
}

export function InvestigationResult({ targetName, targetInitial, isChor, animated = false, className, ...rest }: InvestigationResultProps) {
  return (
    <div
      className={cn(
        'kui-invresult',
        isChor ? 'kui-invresult--guilty' : 'kui-invresult--innocent',
        animated && 'kui-invresult--animated',
        className,
      )}
      {...rest}
    >
      <Avatar initial={targetInitial} size="xl" />
      <p className="kui-invresult__name">{targetName}</p>
      <span className="kui-invresult__verdict">
        {isChor ? 'CHOR! 🔴' : 'Innocent ✅'}
      </span>
    </div>
  )
}
