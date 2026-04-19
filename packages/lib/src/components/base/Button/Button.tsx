import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   'primary' | 'secondary' | 'ghost'
  size?:      'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  as?:        React.ElementType
  className?: string
  children?:  React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      as: Tag = 'button',
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) {
    return (
      <Tag
        ref={ref}
        className={cn(
          'kui-button',
          `kui-button--${variant}`,
          `kui-button--${size}`,
          isLoading && 'kui-button--loading',
          className,
        )}
        disabled={Tag === 'button' ? disabled || isLoading : undefined}
        aria-disabled={disabled || isLoading || undefined}
        {...rest}
      >
        {isLoading && <span className="kui-button__spinner" aria-hidden="true" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </Tag>
    )
  },
)
