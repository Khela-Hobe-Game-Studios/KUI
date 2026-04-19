import { cn } from '../../../utils/cn'
import './SettingsPanel.scss'

interface SettingRow { key: string; value: string; isActive?: boolean }

interface SettingsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  settings:   SettingRow[]
  className?: string
}

export function SettingsPanel({ settings, className, ...rest }: SettingsPanelProps) {
  return (
    <div className={cn('kui-settings', className)} {...rest}>
      {settings.map(s => (
        <div key={s.key} className="kui-settings__row">
          <span className="kui-settings__key">{s.key}</span>
          <span className={cn('kui-settings__val', s.isActive && 'kui-settings__val--active')}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  )
}
