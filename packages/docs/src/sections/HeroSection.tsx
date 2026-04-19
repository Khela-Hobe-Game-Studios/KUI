import { useState } from 'react'
import { CodeSnippet } from '../components/CodeSnippet'

const INSTALL_CMD = 'npm install @khelahobe/kui'

const USAGE_SNIPPET = `import { KuiProvider, Button, Badge } from '@khelahobe/kui'
import '@khelahobe/kui/styles'

function App() {
  return (
    <KuiProvider theme="default" colorMode="light">
      <Button variant="primary">Start Game</Button>
      <Badge variant="voting" pulse>Voting</Badge>
    </KuiProvider>
  )
}`

const ZONES = [
  { href: '#primitives', emoji: '🎡', name: 'Primitives' },
  { href: '#display',    emoji: '🎢', name: 'Display'    },
  { href: '#data',       emoji: '🎠', name: 'Data'       },
  { href: '#feedback',   emoji: '🎭', name: 'Feedback'   },
  { href: '#layout',     emoji: '🎪', name: 'Layout'     },
]

export function HeroSection() {
  const [copied, setCopied] = useState(false)

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="docs-hero">
      <p className="docs-hero__eyebrow">🎡 Open-source · Cartoon-pastel · Game-ready</p>
      <h1 className="docs-hero__title">@khelahobe/kui</h1>
      <p className="docs-hero__tagline">Cartoon-pastel React components built for game UIs</p>

      <div className="docs-hero__install">
        <code>{INSTALL_CMD}</code>
        <button className="docs-hero__install-copy" onClick={copyInstall} aria-label="Copy install command">
          {copied ? '✓' : '📋'}
        </button>
      </div>

      <div className="docs-hero__snippet">
        <CodeSnippet code={USAGE_SNIPPET} />
      </div>

      <div className="docs-hero__zones">
        {ZONES.map(z => (
          <a key={z.href} href={z.href} className="docs-hero__zone-link">
            <span className="docs-hero__zone-emoji">{z.emoji}</span>
            <span className="docs-hero__zone-name">{z.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
