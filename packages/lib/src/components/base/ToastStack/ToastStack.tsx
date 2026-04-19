import React from 'react'
import { cn } from '../../../utils/cn'
import type { ToastItem } from '../../../types'
import './ToastStack.scss'

interface ToastStackProps {
  toasts:     ToastItem[]
  className?: string
}

const TYPE_CLASS: Record<NonNullable<ToastItem['type']>, string> = {
  info:    'kui-toast--info',
  success: 'kui-toast--success',
  danger:  'kui-toast--danger',
}

export function ToastStack({ toasts, className }: ToastStackProps) {
  if (toasts.length === 0) return null
  return (
    <div className={cn('kui-toaststack', className)} role="log" aria-live="polite">
      {[...toasts].reverse().map(t => (
        <div
          key={t.id}
          className={cn('kui-toast', t.type ? TYPE_CLASS[t.type] : TYPE_CLASS.info)}
          role="status"
        >
          {t.emoji && <span className="kui-toast__emoji" aria-hidden="true">{t.emoji}</span>}
          <span className="kui-toast__msg">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
