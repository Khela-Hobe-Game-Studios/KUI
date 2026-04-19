import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import './Select.scss'

interface SelectOption { value: string; label: string }

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:     string
  error?:     string
  options:    SelectOption[]
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, options, className, id, ...rest }, ref) {
    return (
      <div className={cn('kui-select-wrap', className)}>
        {label && <label className="kui-select-label" htmlFor={id}>{label}</label>}
        <select
          ref={ref}
          id={id}
          className={cn('kui-select', error && 'kui-select--error')}
          aria-invalid={!!error}
          {...rest}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {error && <span className="kui-select-error" role="alert">{error}</span>}
      </div>
    )
  },
)
