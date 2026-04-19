import type { KuiTheme, KuiColorMode } from '../../../types'
import { cn } from '../../../utils/cn'
import '../../../styles/tokens.scss'
import '../../../styles/base.scss'
import '../../../styles/animations.scss'

interface KuiProviderProps {
  theme?:     KuiTheme
  colorMode?: KuiColorMode
  children:   React.ReactNode
  className?: string
}

export function KuiProvider({
  theme = 'default',
  colorMode = 'light',
  children,
  className,
}: KuiProviderProps) {
  return (
    <div
      data-kui-theme={theme}
      data-kui-mode={colorMode}
      className={cn('kui-root', className)}
    >
      {children}
    </div>
  )
}
