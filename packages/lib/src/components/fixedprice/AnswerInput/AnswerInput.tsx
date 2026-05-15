import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import './AnswerInput.scss'

interface AnswerInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  unit?:        string
  accentColor?: string
  onSubmit?:    (value: string) => void
  className?:   string
}

export const AnswerInput = forwardRef<HTMLInputElement, AnswerInputProps>(
  function AnswerInput({ unit, accentColor, onSubmit, className, style, onKeyDown, ...rest }, ref) {
    const inlineStyle = accentColor
      ? ({ ...style, '--kui-answer-accent': accentColor } as React.CSSProperties)
      : style

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit((e.target as HTMLInputElement).value)
      }
      onKeyDown?.(e)
    }

    return (
      <div className={cn('kui-answer', className)} style={inlineStyle}>
        <input
          ref={ref}
          type="number"
          inputMode="decimal"
          autoComplete="off"
          className="kui-answer__input"
          onKeyDown={handleKeyDown}
          {...rest}
        />
        {unit && <span className="kui-answer__unit">{unit}</span>}
      </div>
    )
  },
)
