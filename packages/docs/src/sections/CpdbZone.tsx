import { useState } from 'react'
import {
  RoleCard,
  VoteTally,
  ActionPrompt,
  InvestigationResult,
  PhaseTransition,
  EliminationAnnouncement,
} from '@khelahobe/kui/cpdb'
import type { CpdbRole, CpdbPhase } from '@khelahobe/kui/cpdb'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ─── Prop tables ──────────────────────────────────────────────────────────────

const roleCardProps: PropRow[] = [
  { name: 'role',       type: 'CpdbRole', required: true,   description: "The player's role — determines the card back colour and label." },
  { name: 'playerName', type: 'string',   required: true,   description: 'Displayed on the card back after the role is revealed.' },
  { name: 'revealed',   type: 'boolean',  default: 'false', description: 'When true the card flips 180° to show the role.' },
  { name: 'className',  type: 'string',   description: 'Optional extra class forwarded to the root element.' },
]

const voteTallyProps: PropRow[] = [
  { name: 'nominations', type: 'VoteTallyEntry[]', required: true, description: 'Array of { playerId, name, initial, votes, isLeading? }.' },
  { name: 'totalVoters', type: 'number',            required: true, description: 'Total number of voters — used to compute percentage bar widths.' },
  { name: 'className',   type: 'string',            description: 'Optional extra class forwarded to the root element.' },
]

const actionPromptProps: PropRow[] = [
  { name: 'phase',     type: 'CpdbPhase', required: true, description: 'Current game phase — determines the icon shown.' },
  { name: 'role',      type: 'CpdbRole',  required: true, description: "The acting player's role — tints the left border." },
  { name: 'message',   type: 'string',    required: true, description: 'Primary instruction text.' },
  { name: 'subtext',   type: 'string',    description: 'Optional secondary line shown below the message.' },
  { name: 'className', type: 'string',    description: 'Optional extra class forwarded to the root element.' },
]

const invResultProps: PropRow[] = [
  { name: 'targetName',    type: 'string',  required: true,   description: 'Name of the investigated player.' },
  { name: 'targetInitial', type: 'string',  required: true,   description: 'Single-letter initial for the Avatar.' },
  { name: 'isChor',        type: 'boolean', required: true,   description: 'True = guilty (red CHOR!), false = innocent (green).' },
  { name: 'animated',      type: 'boolean', default: 'false', description: 'When true, applies a scale-in entrance animation.' },
  { name: 'className',     type: 'string',  description: 'Optional extra class forwarded to the root element.' },
]

const phaseTransProps: PropRow[] = [
  { name: 'phase',     type: 'CpdbPhase', required: true, description: 'The phase to display — sets the overlay colour and label.' },
  { name: 'visible',   type: 'boolean',   required: true, description: 'When true the overlay fades in and takes pointer events.' },
  { name: 'className', type: 'string',    description: 'Optional extra class forwarded to the root element.' },
]

const eliminationProps: PropRow[] = [
  { name: 'playerName',    type: 'string',   required: true,   description: "The eliminated player's name." },
  { name: 'playerInitial', type: 'string',   required: true,   description: 'Single-letter initial for the greyscale Avatar.' },
  { name: 'role',          type: 'CpdbRole', required: true,   description: "The player's role — used for role-reveal text and border accent." },
  { name: 'animated',      type: 'boolean',  default: 'false', description: 'When true, slides the card in from the top.' },
  { name: 'className',     type: 'string',   description: 'Optional extra class forwarded to the root element.' },
]

// ─── Snippets ─────────────────────────────────────────────────────────────────

const roleCardSnippet = `const [revealed, setRevealed] = useState(false)

<RoleCard
  role="police"
  playerName="Alice"
  revealed={revealed}
  onClick={() => setRevealed(r => !r)}
/>`

const voteTallySnippet = `<VoteTally
  nominations={[
    { playerId: '1', name: 'Karim',  initial: 'K', votes: 3, isLeading: true },
    { playerId: '2', name: 'Rahim',  initial: 'R', votes: 2 },
    { playerId: '3', name: 'Selim',  initial: 'S', votes: 1 },
  ]}
  totalVoters={8}
/>`

const actionPromptSnippet = `<ActionPrompt
  phase="night"
  role="police"
  message="Choose a player to investigate."
  subtext="Your result will appear at dawn."
/>`

const invResultSnippet = `<InvestigationResult
  targetName="Karim"
  targetInitial="K"
  isChor={true}
  animated
/>`

const phaseTransSnippet = `const [visible, setVisible] = useState(false)

<PhaseTransition phase="night" visible={visible} />

<button onClick={() => {
  setVisible(true)
  setTimeout(() => setVisible(false), 1800)
}}>
  Trigger Night
</button>`

const eliminationSnippet = `<EliminationAnnouncement
  playerName="Rahim"
  playerInitial="R"
  role="chor"
  animated
/>`

// ─── Demos ────────────────────────────────────────────────────────────────────

function RoleCardDemo() {
  const roles: CpdbRole[] = ['chor', 'police', 'daktar', 'babu']
  const [role, setRole] = useState<CpdbRole>('police')
  const [revealed, setRevealed] = useState(false)

  function pick(r: CpdbRole) {
    setRevealed(false)
    setTimeout(() => setRole(r), 20)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
      <RoleCard role={role} playerName="Alice" revealed={revealed} onClick={() => setRevealed(v => !v)} style={{ cursor: 'pointer' }} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {roles.map(r => (
          <button key={r} onClick={() => pick(r)} style={pillStyle(role === r)}>{r}</button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--kui-text-muted)', fontFamily: 'var(--kui-font-sans)' }}>
        Click the card to flip
      </p>
    </div>
  )
}

function VoteTallyDemo() {
  const [counts, setCounts] = useState([3, 2, 1])

  function randomise() {
    setCounts([
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 3),
    ])
  }

  const max = Math.max(...counts)
  const nominations = [
    { playerId: '1', name: 'Karim', initial: 'K', votes: counts[0], isLeading: counts[0] === max && counts[0] > 0 },
    { playerId: '2', name: 'Rahim', initial: 'R', votes: counts[1], isLeading: counts[1] === max && counts[1] > 0 && counts[1] !== counts[0] },
    { playerId: '3', name: 'Selim', initial: 'S', votes: counts[2] },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <VoteTally nominations={nominations} totalVoters={8} />
      <button
        onClick={randomise}
        style={{
          padding: '7px 18px',
          borderRadius: 'var(--kui-radius-sm)',
          border: '1.5px solid var(--kui-border)',
          background: 'var(--kui-surface)',
          color: 'var(--kui-text)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '12px',
          fontFamily: 'var(--kui-font-sans)',
          alignSelf: 'flex-start',
        }}
      >🎲 Randomise</button>
    </div>
  )
}

function ActionPromptDemo() {
  const phases: CpdbPhase[] = ['lobby', 'night', 'day', 'voting', 'results']
  const roles: CpdbRole[]   = ['chor', 'police', 'daktar', 'babu']
  const [phase, setPhase] = useState<CpdbPhase>('night')
  const [role, setRole]   = useState<CpdbRole>('police')

  const messages: Record<CpdbRole, string> = {
    police: 'Choose a player to investigate.',
    chor:   'Choose your victim for tonight.',
    daktar: 'Choose a player to save.',
    babu:   'No action tonight. Lay low.',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {phases.map(p => (
          <button key={p} onClick={() => setPhase(p)} style={pillStyle(phase === p)}>{p}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {roles.map(r => (
          <button key={r} onClick={() => setRole(r)} style={pillStyle(role === r)}>{r}</button>
        ))}
      </div>
      <ActionPrompt phase={phase} role={role} message={messages[role]} subtext="This action is only visible to you." />
    </div>
  )
}

function InvestigationResultDemo() {
  const [isChor, setIsChor] = useState(true)
  const [key, setKey] = useState(0)

  function toggle() { setIsChor(v => !v); setKey(k => k + 1) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
      <InvestigationResult key={key} targetName="Karim" targetInitial="K" isChor={isChor} animated />
      <button onClick={toggle} style={primaryBtnStyle()}>Toggle verdict</button>
    </div>
  )
}

function PhaseTransitionDemo() {
  const phases: CpdbPhase[] = ['night', 'day', 'voting', 'results']
  const [phase, setPhase]   = useState<CpdbPhase>('night')
  const [visible, setVisible] = useState(false)

  function trigger(p: CpdbPhase) {
    setPhase(p)
    setVisible(true)
    setTimeout(() => setVisible(false), 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--kui-text-muted)', fontFamily: 'var(--kui-font-sans)' }}>
        Click a phase to trigger the full-screen overlay:
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {phases.map(p => (
          <button key={p} onClick={() => trigger(p)} style={primaryBtnStyle()}>{p}</button>
        ))}
      </div>
      <PhaseTransition phase={phase} visible={visible} />
    </div>
  )
}

function EliminationAnnouncementDemo() {
  const roles: CpdbRole[] = ['chor', 'police', 'daktar', 'babu']
  const [role, setRole] = useState<CpdbRole>('chor')
  const [key, setKey]   = useState(0)

  function pick(r: CpdbRole) { setRole(r); setKey(k => k + 1) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {roles.map(r => (
          <button key={r} onClick={() => pick(r)} style={pillStyle(role === r)}>{r}</button>
        ))}
      </div>
      <EliminationAnnouncement key={key} playerName="Rahim" playerInitial="R" role={role} animated />
    </div>
  )
}

// ─── Shared button helpers ────────────────────────────────────────────────────

function pillStyle(active: boolean): React.CSSProperties {
  return {
    padding: '4px 12px',
    borderRadius: 'var(--kui-radius-full)',
    border: '1.5px solid var(--kui-border)',
    background: active ? 'var(--kui-primary)' : 'transparent',
    color: active ? '#fff' : 'var(--kui-text)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '12px',
    fontFamily: 'var(--kui-font-sans)',
  }
}

function primaryBtnStyle(): React.CSSProperties {
  return {
    padding: '7px 18px',
    borderRadius: 'var(--kui-radius-sm)',
    border: '1.5px solid var(--kui-primary)',
    background: 'var(--kui-primary)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '13px',
    fontFamily: 'var(--kui-font-sans)',
  }
}

// ─── Zone ─────────────────────────────────────────────────────────────────────

export function CpdbZone() {
  return (
    <section id="cpdb" className="docs-zone docs-zone--cpdb">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎮</span>
        <h2 className="docs-zone__title">CPDB Zone</h2>
        <p className="docs-zone__subtitle">
          Game-specific UI for Chor Police Daktar Babu — roles, votes, phases, investigations, and eliminations.
        </p>
      </div>
      <div className="docs-zone__booths">
        <Booth id="rolecard" emoji="🃏" title="RoleCard" description="3D flip card that reveals a player's role. Click to flip between the mystery front and the coloured role back." props={roleCardProps} snippet={roleCardSnippet}>
          <RoleCardDemo />
        </Booth>

        <Booth id="votetally" emoji="🗳️" title="VoteTally" description="Live vote bar chart. The leading player's row is highlighted with a tertiary accent and wider bar." props={voteTallyProps} snippet={voteTallySnippet}>
          <VoteTallyDemo />
        </Booth>

        <Booth id="actionprompt" emoji="📢" title="ActionPrompt" description="Role-aware instruction card shown during a player's action phase. Left border colour matches the player's role." props={actionPromptProps} snippet={actionPromptSnippet}>
          <ActionPromptDemo />
        </Booth>

        <Booth id="invresult" emoji="🔍" title="InvestigationResult" description="Police investigation outcome — shows the target's avatar plus a guilty or innocent verdict with matching colour." props={invResultProps} snippet={invResultSnippet}>
          <InvestigationResultDemo />
        </Booth>

        <Booth id="phasetrans" emoji="🌓" title="PhaseTransition" description="Full-screen fixed overlay that announces a phase change. Each phase has a distinct background colour. Fades in and out." props={phaseTransProps} snippet={phaseTransSnippet}>
          <PhaseTransitionDemo />
        </Booth>

        <Booth id="elimination" emoji="💀" title="EliminationAnnouncement" description="Dramatic card announcing a player's elimination and role reveal. Greyscale avatar with optional slide-in animation." props={eliminationProps} snippet={eliminationSnippet}>
          <EliminationAnnouncementDemo />
        </Booth>
      </div>
    </section>
  )
}
