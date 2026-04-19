import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import './Card.scss'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'secondary' | 'ghost'
  className?: string
  children:   React.ReactNode
}

interface CardSubProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children:   React.ReactNode
}

function CardHeader({ className, children, ...rest }: CardSubProps) {
  return <div className={cn('kui-card__header', className)} {...rest}>{children}</div>
}

function CardBody({ className, children, ...rest }: CardSubProps) {
  return <div className={cn('kui-card__body', className)} {...rest}>{children}</div>
}

function CardFooter({ className, children, ...rest }: CardSubProps) {
  return <div className={cn('kui-card__footer', className)} {...rest}>{children}</div>
}

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader
  Body:   typeof CardBody
  Footer: typeof CardFooter
}

const CardBase = forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant = 'default', className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('kui-card', `kui-card--${variant}`, className)}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export const Card = CardBase as CardComponent
Card.Header = CardHeader
Card.Body   = CardBody
Card.Footer = CardFooter
