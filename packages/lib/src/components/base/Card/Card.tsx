import { createContext, forwardRef, useContext, useState } from 'react'
import { cn } from '../../../utils/cn'
import './Card.scss'

interface CardContextValue {
  collapsible: boolean
  collapsed: boolean
  onToggle: () => void
}

const CardContext = createContext<CardContextValue>({
  collapsible: false,
  collapsed: false,
  onToggle: () => {},
})

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'ghost'
  className?: string
  children: React.ReactNode
  /** Adds a chevron toggle button to the header; hides body/footer when collapsed. */
  collapsible?: boolean
  /** Controlled collapsed state. */
  collapsed?: boolean
  /** Initial collapsed state for uncontrolled usage. */
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

interface CardSubProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

function CardHeader({ className, children, ...rest }: CardSubProps) {
  const { collapsible, collapsed, onToggle } = useContext(CardContext)
  return (
    <div className={cn('kui-card__header', collapsible && 'kui-card__header--collapsible', className)} {...rest}>
      <div className="kui-card__header-content">{children}</div>
      {collapsible && (
        <button
          type="button"
          className={cn('kui-card__collapse-btn', collapsed && 'kui-card__collapse-btn--collapsed')}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M2 3.5L5.5 7L9 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

function CardBody({ className, children, ...rest }: CardSubProps) {
  const { collapsed } = useContext(CardContext)
  if (collapsed) return null
  return <div className={cn('kui-card__body', className)} {...rest}>{children}</div>
}

function CardFooter({ className, children, ...rest }: CardSubProps) {
  const { collapsed } = useContext(CardContext)
  if (collapsed) return null
  return <div className={cn('kui-card__footer', className)} {...rest}>{children}</div>
}

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader
  Body:   typeof CardBody
  Footer: typeof CardFooter
}

const CardBase = forwardRef<HTMLDivElement, CardProps>(
  function Card({
    variant = 'default',
    className,
    children,
    collapsible,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    ...rest
  }, ref) {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed

    const onToggle = () => {
      const next = !collapsed
      if (!isControlled) setInternalCollapsed(next)
      onCollapsedChange?.(next)
    }

    return (
      <CardContext.Provider value={{ collapsible: !!collapsible, collapsed, onToggle }}>
        <div
          ref={ref}
          className={cn('kui-card', `kui-card--${variant}`, collapsed && 'kui-card--collapsed', className)}
          {...rest}
        >
          {children}
        </div>
      </CardContext.Provider>
    )
  },
)

export const Card = CardBase as CardComponent
Card.Header = CardHeader
Card.Body   = CardBody
Card.Footer = CardFooter
