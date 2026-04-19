import { useState } from 'react'
import { Button, Badge, Input, Select, Avatar } from '@khelahobe/kui'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

const BUTTON_PROPS: PropRow[] = [
  { name: 'variant',   type: "'primary' | 'secondary' | 'ghost'", default: "'primary'",  description: 'Visual style' },
  { name: 'size',      type: "'sm' | 'md' | 'lg'",                default: "'md'",       description: 'Button size' },
  { name: 'isLoading', type: 'boolean',                           default: 'false',      description: 'Shows spinner, disables click' },
  { name: 'leftIcon',  type: 'ReactNode',                         description: 'Icon before label' },
  { name: 'rightIcon', type: 'ReactNode',                         description: 'Icon after label' },
  { name: 'as',        type: 'ElementType',                       default: "'button'",   description: 'Polymorphic element override' },
]

const BADGE_PROPS: PropRow[] = [
  { name: 'variant', type: "'default' | 'night' | 'day' | 'voting' | 'lobby' | 'success' | 'danger'", default: "'default'", description: 'Color variant' },
  { name: 'pulse',   type: 'boolean', default: 'false', description: 'Pulsing animation' },
]

const INPUT_PROPS: PropRow[] = [
  { name: 'label', type: 'string',    description: 'Label above input' },
  { name: 'error', type: 'string',    description: 'Error message shown below' },
  { name: 'id',    type: 'string',    description: 'Links label htmlFor and error aria' },
]

const SELECT_PROPS: PropRow[] = [
  { name: 'options', type: 'SelectOption[]', required: true, description: 'Array of {value, label} pairs' },
  { name: 'label',   type: 'string',                         description: 'Label above select' },
  { name: 'error',   type: 'string',                         description: 'Error message' },
]

const AVATAR_PROPS: PropRow[] = [
  { name: 'initial',  type: 'string',                    required: true, description: 'Character shown (first char used)' },
  { name: 'size',     type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size' },
  { name: 'color',    type: 'string',                    description: 'Background color override' },
  { name: 'isWinner', type: 'boolean',                   default: 'false', description: 'Winner glow animation' },
]

export function PrimitivesZone() {
  const [loading, setLoading]     = useState(false)
  const [pulse, setPulse]         = useState(false)
  const [inputErr, setInputErr]   = useState(false)
  const [inputVal, setInputVal]   = useState('')
  const [selectVal, setSelectVal] = useState('react')

  return (
    <section id="primitives" className="docs-zone docs-zone--primitives">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎡</span>
        <h2 className="docs-zone__title">Primitives</h2>
        <p className="docs-zone__subtitle">Core interactive elements — the building blocks of every game UI</p>
      </div>

      <div className="docs-zone__booths">

        <Booth
          id="button"
          emoji="🎮"
          title="Button"
          description="Primary action element with 3 variants, 3 sizes, loading state, and icon slots."
          snippet={`import { Button } from '@khelahobe/kui'

<Button variant="primary" size="md">Play Now</Button>
<Button variant="secondary" leftIcon="🎲">Roll Dice</Button>
<Button variant="ghost" isLoading>Waiting…</Button>`}
          props={BUTTON_PROPS}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <Button variant="primary"   size="sm">Small</Button>
            <Button variant="primary"   size="md" isLoading={loading}>Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="ghost"     size="md">Ghost</Button>
            <Button variant="primary"   size="lg">Large</Button>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--kui-text-muted)' }}>
            <input type="checkbox" checked={loading} onChange={e => setLoading(e.target.checked)} />
            isLoading
          </label>
        </Booth>

        <Booth
          id="badge"
          emoji="🏷️"
          title="Badge"
          description="Status indicators for game phases, roles, and outcomes."
          snippet={`import { Badge } from '@khelahobe/kui'

<Badge variant="success">Alive</Badge>
<Badge variant="danger">Eliminated</Badge>
<Badge variant="voting" pulse>Voting</Badge>`}
          props={BADGE_PROPS}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['default', 'night', 'day', 'voting', 'lobby', 'success', 'danger'] as const).map(v => (
              <Badge key={v} variant={v} pulse={pulse && v === 'voting'}>{v}</Badge>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--kui-text-muted)' }}>
            <input type="checkbox" checked={pulse} onChange={e => setPulse(e.target.checked)} />
            pulse on voting
          </label>
        </Booth>

        <Booth
          id="input"
          emoji="⌨️"
          title="Input"
          description="Text input with label, error state, and full ref forwarding."
          snippet={`import { Input } from '@khelahobe/kui'

<Input
  id="name"
  label="Player Name"
  placeholder="Enter your name…"
  value={name}
  onChange={e => setName(e.target.value)}
/>

// With error
<Input id="code" label="Room Code" error="Invalid code" />`}
          props={INPUT_PROPS}
        >
          <Input
            id="demo-input"
            label="Player Name"
            placeholder="Enter your name…"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            error={inputErr ? 'Name is required' : undefined}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--kui-text-muted)' }}>
            <input type="checkbox" checked={inputErr} onChange={e => setInputErr(e.target.checked)} />
            show error
          </label>
        </Booth>

        <Booth
          id="select"
          emoji="📋"
          title="Select"
          description="Dropdown select with label, error state, and full ref forwarding."
          snippet={`import { Select } from '@khelahobe/kui'

<Select
  id="role"
  label="Assign Role"
  value={role}
  onChange={e => setRole(e.target.value)}
  options={[
    { value: 'chor',   label: 'Chor'   },
    { value: 'police', label: 'Police' },
    { value: 'daktar', label: 'Daktar' },
    { value: 'babu',   label: 'Babu'   },
  ]}
/>`}
          props={SELECT_PROPS}
        >
          <Select
            id="demo-select"
            label="Pick your game"
            value={selectVal}
            onChange={e => setSelectVal(e.target.value)}
            options={[
              { value: 'react',  label: 'React 19'    },
              { value: 'cpdb',   label: 'Chor Police' },
              { value: 'fp',     label: 'Fixed Price'  },
            ]}
          />
        </Booth>

        <Booth
          id="avatar"
          emoji="🎭"
          title="Avatar"
          description="Player avatar with initial, 4 sizes, custom color, and winner glow."
          snippet={`import { Avatar } from '@khelahobe/kui'

<Avatar initial="A" size="md" />
<Avatar initial="B" size="lg" color="#ff9a9e" />
<Avatar initial="W" size="xl" isWinner />`}
          props={AVATAR_PROPS}
        >
          <Avatar initial="A" size="sm" />
          <Avatar initial="B" size="md" />
          <Avatar initial="C" size="lg" color="#ff9a9e" />
          <Avatar initial="W" size="xl" isWinner />
        </Booth>

      </div>
    </section>
  )
}
