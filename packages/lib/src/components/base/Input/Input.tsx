import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import './Input.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string
  error?:     string
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, id, ...rest }, ref) {
    return (
      <div className={cn('kui-input-wrap', className)}>
        {label && <label className="kui-input-label" htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          id={id}
          className={cn('kui-input', error && 'kui-input--error')}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {error && (
          <span id={`${id}-error`} className="kui-input-error" role="alert">{error}</span>
        )}
      </div>
    )
  },
)
