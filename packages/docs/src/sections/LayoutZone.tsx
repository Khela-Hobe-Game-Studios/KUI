import { useState } from 'react'
import { KuiProvider, SettingsPanel, Button, StudioCredit } from '@khelahobe/kui'
import type { KuiTheme, KuiColorMode } from '@khelahobe/kui'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ─── Prop tables ──────────────────────────────────────────────────────────────

const kuiProviderProps: PropRow[] = [
  {
    name: 'theme',
    type: '"default" | "chor" | "police" | "daktar"',
    default: '"default"',
    description: 'Sets the active theme token set for the wrapped subtree via data-kui-theme.',
  },
  {
    name: 'colorMode',
    type: '"light" | "dark"',
    default: '"light"',
    description: 'Sets the color mode for the subtree via data-kui-mode.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Subtree that inherits the provided theme and color mode.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Optional extra class name forwarded to the root div.',
  },
]

const studioCreditProps: PropRow[] = [
  { name: 'studio',    type: 'string',  required: true,        description: 'Studio or author name displayed in the credit.' },
  { name: 'by',        type: 'string',  default: "'A game by'", description: 'Small uppercase prefix shown above the studio name.' },
  { name: 'glyph',     type: 'ReactNode', default: "'✦'",       description: 'Centered ornament between the two divider lines.' },
  { name: 'fixed',     type: 'boolean', default: 'false',      description: 'Pin the credit to the bottom-center of the viewport.' },
  { name: 'className', type: 'string',                         description: 'Optional extra class forwarded to the root element.' },
]

const settingsPanelProps: PropRow[] = [
  {
    name: 'settings',
    type: 'Array<{ key: string; value: string; isActive?: boolean }>',
    required: true,
    description: 'List of key/value rows. Set isActive to highlight a row as the active state.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Optional extra class name forwarded to the root element.',
  },
]

// ─── Code snippets ────────────────────────────────────────────────────────────

const kuiProviderSnippet = `// Any subtree can have its own independent theme
<KuiProvider theme="chor" colorMode="dark">
  <Button variant="primary">Chor Action</Button>
</KuiProvider>

// Nest multiple providers for side-by-side theme previews
<div style={{ display: 'flex', gap: 16 }}>
  <KuiProvider theme="default"><Button>Default</Button></KuiProvider>
  <KuiProvider theme="chor">  <Button>Chor</Button>   </KuiProvider>
  <KuiProvider theme="police"><Button>Police</Button> </KuiProvider>
  <KuiProvider theme="daktar"><Button>Daktar</Button> </KuiProvider>
</div>`

const studioCreditSnippet = `// Inline (sits at the end of a flex column)
<StudioCredit studio="Khela Hobe Game Studios" />

// Pinned to the viewport bottom (useful on landing pages)
<StudioCredit studio="Khela Hobe Game Studios" fixed />

// Custom prefix and glyph
<StudioCredit studio="Made by Karim" by="A game by" glyph="·" />`

const settingsPanelSnippet = `const [settings, setSettings] = useState([
  { key: 'Players', value: '6',     isActive: true  },
  { key: 'Phase',   value: 'Night', isActive: false },
  { key: 'Round',   value: '2 / 5', isActive: true  },
])

// Toggle a row by clicking
function toggle(key: string) {
  setSettings(prev =>
    prev.map(s => s.key === key ? { ...s, isActive: !s.isActive } : s)
  )
}

<SettingsPanel settings={settings} />`

// ─── KuiProvider demo ─────────────────────────────────────────────────────────

interface ThemeConfig {
  theme: KuiTheme
  label: string
  colorMode: KuiColorMode
}

const THEME_CONFIGS: ThemeConfig[] = [
  { theme: 'default', label: 'Default', colorMode: 'light' },
  { theme: 'chor',    label: 'Chor',    colorMode: 'light' },
  { theme: 'police',  label: 'Police',  colorMode: 'light' },
  { theme: 'daktar',  label: 'Daktar',  colorMode: 'light' },
]

const PANEL_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '12px',
  borderRadius: '8px',
  flex: '1 1 80px',
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.07em',
  color: 'var(--kui-text-muted)',
}

function KuiProviderDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Theme row */}
      <div>
        <p style={{ ...LABEL_STYLE, marginBottom: '10px' }}>Theme variants</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {THEME_CONFIGS.map(({ theme, label, colorMode }) => (
            <KuiProvider key={theme} theme={theme} colorMode={colorMode}>
              <div style={PANEL_STYLE}>
                <Button variant="primary" size="sm">{label}</Button>
                <span style={LABEL_STYLE}>{theme}</span>
              </div>
            </KuiProvider>
          ))}
        </div>
      </div>

      {/* Color mode row */}
      <div>
        <p style={{ ...LABEL_STYLE, marginBottom: '10px' }}>Color modes</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['light', 'dark'] as KuiColorMode[]).map(mode => (
            <KuiProvider key={mode} theme="default" colorMode={mode}>
              <div
                style={{
                  ...PANEL_STYLE,
                  background: mode === 'dark' ? '#1e1e2e' : '#f5f5ff',
                  border: '2px solid var(--kui-border)',
                }}
              >
                <Button variant="primary" size="sm">
                  {mode === 'light' ? '☀️ Light' : '🌙 Dark'}
                </Button>
                <span
                  style={{
                    ...LABEL_STYLE,
                    color: mode === 'dark' ? '#888' : 'var(--kui-text-muted)',
                  }}
                >
                  colorMode="{mode}"
                </span>
              </div>
            </KuiProvider>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SettingsPanel demo ───────────────────────────────────────────────────────

interface SettingRow {
  key: string
  value: string
  isActive: boolean
}

const INITIAL_SETTINGS: SettingRow[] = [
  { key: 'Players', value: '6',      isActive: true  },
  { key: 'Phase',   value: 'Night',  isActive: false },
  { key: 'Round',   value: '2 / 5',  isActive: true  },
  { key: 'Mode',    value: 'Hidden', isActive: false },
  { key: 'Timer',   value: '60 s',   isActive: true  },
]

function SettingsPanelDemo() {
  const [settings, setSettings] = useState<SettingRow[]>(INITIAL_SETTINGS)

  function toggleRow(key: string) {
    setSettings(prev =>
      prev.map(s => s.key === key ? { ...s, isActive: !s.isActive } : s),
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Wrap each row in a clickable div to allow toggling */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {settings.map(s => (
          <button
            key={s.key}
            onClick={() => toggleRow(s.key)}
            title={`Click to ${s.isActive ? 'deactivate' : 'activate'} ${s.key}`}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'block',
              width: '100%',
            }}
          >
            <SettingsPanel settings={[s]} />
          </button>
        ))}
      </div>
      <p
        style={{
          fontSize: '12px',
          color: 'var(--kui-text-muted)',
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        Click any row to toggle its active state.
      </p>
    </div>
  )
}

// ─── Zone ─────────────────────────────────────────────────────────────────────

export function LayoutZone() {
  return (
    <section id="layout" className="docs-zone docs-zone--layout">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎪</span>
        <h2 className="docs-zone__title">Layout Zone</h2>
        <p className="docs-zone__subtitle">
          Theme providers and structural components — the scaffolding every game screen is built on.
        </p>
      </div>

      <div className="docs-zone__booths">
        <Booth
          id="kuiprovider"
          emoji="🎨"
          title="KuiProvider"
          description="Wraps any subtree to apply a theme and color mode. Nest multiple providers independently — each subtree gets its own context."
          props={kuiProviderProps}
          snippet={kuiProviderSnippet}
        >
          <KuiProviderDemo />
        </Booth>

        <Booth
          id="settingspanel"
          emoji="⚙️"
          title="SettingsPanel"
          description="Displays a compact list of game settings as key/value rows. Highlighted rows signal the currently active state."
          props={settingsPanelProps}
          snippet={settingsPanelSnippet}
        >
          <SettingsPanelDemo />
        </Booth>

        <Booth
          id="studiocredit"
          emoji="🎬"
          title="StudioCredit"
          description="Refined 'A game by Studio Name' credit with an ornamental rule. Pair with the fixed prop to pin it to the bottom of a landing page."
          props={studioCreditProps}
          snippet={studioCreditSnippet}
        >
          <div style={{ padding: '12px 0' }}>
            <StudioCredit studio="Khela Hobe Game Studios" />
          </div>
        </Booth>
      </div>
    </section>
  )
}
