import type { KuiTheme, KuiColorMode } from '@khelahobe/kui'

interface TopBarProps {
  theme:             KuiTheme
  onThemeChange:     (t: KuiTheme) => void
  colorMode:         KuiColorMode
  onColorModeChange: (m: KuiColorMode) => void
}

const THEMES: { value: KuiTheme; label: string }[] = [
  { value: 'default', label: '🎨 Default' },
  { value: 'chor',    label: '🔴 Chor'    },
  { value: 'police',  label: '🔵 Police'  },
  { value: 'daktar',  label: '🟢 Daktar'  },
  { value: 'fixedprice', label: '🇧🇩 FixedPrice' },
]

const ZONES = [
  { id: 'primitives', label: '🎡 Primitives' },
  { id: 'display',    label: '🎢 Display'    },
  { id: 'data',       label: '🎠 Data'       },
  { id: 'feedback',   label: '🎭 Feedback'   },
  { id: 'layout',     label: '🎪 Layout'     },
  { id: 'cpdb',       label: '🎮 CPDB'       },
  { id: 'fixedprice', label: '🇧🇩 FixedPrice' },
  { id: 'fun',        label: '🎉 Fun'        },
]

export const TopBar = ({ theme, onThemeChange, colorMode, onColorModeChange }: TopBarProps) => {
  return (
    <header className="docs-topbar">
      <a href="#" className="docs-topbar__logo">kui 🎡</a>
      <nav>
        <ul className="docs-topbar__nav">
          {ZONES.map(z => (
            <li key={z.id}>
              <a href={`#${z.id}`} className="docs-topbar__nav-link">{z.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="docs-topbar__controls">
        <select
          className="docs-topbar__theme-select"
          value={theme}
          onChange={e => onThemeChange(e.target.value as KuiTheme)}
          aria-label="Theme"
        >
          {THEMES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <button
          className="docs-topbar__mode-btn"
          onClick={() => onColorModeChange(colorMode === 'light' ? 'dark' : 'light')}
          aria-label="Toggle dark mode"
        >
          {colorMode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
