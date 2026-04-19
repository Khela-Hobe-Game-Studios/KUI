import { useState, useCallback } from 'react'
import { ConfettiBurst, CountdownSplash, ToastStack, PulseRing } from '@khelahobe/kui'
import type { ToastItem } from '@khelahobe/kui'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ─── Prop tables ──────────────────────────────────────────────────────────────

const confettiProps: PropRow[] = [
  { name: 'active',    type: 'boolean', required: true, description: 'When true, renders and animates the confetti pieces.' },
  { name: 'count',     type: 'number',  default: '40',  description: 'Number of confetti pieces to render.' },
  { name: 'className', type: 'string',  description: 'Optional extra class forwarded to the container.' },
]

const countdownProps: PropRow[] = [
  { name: 'count',     type: 'number',  required: true, description: 'The number currently being displayed. Change this to restart the animation.' },
  { name: 'visible',   type: 'boolean', required: true, description: 'When false the overlay is not rendered at all.' },
  { name: 'className', type: 'string',  description: 'Optional extra class forwarded to the root element.' },
]

const toastProps: PropRow[] = [
  { name: 'toasts',    type: 'ToastItem[]', required: true, description: 'Array of toast objects ({ id, message, type?, emoji? }). Newest appears on top.' },
  { name: 'className', type: 'string',      description: 'Optional extra class forwarded to the stack container.' },
]

const pulseRingProps: PropRow[] = [
  { name: 'active',    type: 'boolean',   default: 'false', description: 'When true the expanding ring animation plays.' },
  { name: 'color',     type: 'string',    description: 'CSS color string for the ring. Defaults to var(--kui-primary).' },
  { name: 'children',  type: 'ReactNode', required: true,   description: 'The element the ring wraps.' },
  { name: 'className', type: 'string',    description: 'Optional extra class forwarded to the root element.' },
]

// ─── Snippets ─────────────────────────────────────────────────────────────────

const confettiSnippet = `const [active, setActive] = useState(false)

// position:relative on the parent to contain the pieces
<div style={{ position: 'relative' }}>
  <ConfettiBurst active={active} count={40} />
  <button onClick={() => {
    setActive(true)
    setTimeout(() => setActive(false), 2000)
  }}>
    🎊 Burst!
  </button>
</div>`

const countdownSnippet = `const [count, setCount] = useState(3)
const [visible, setVisible] = useState(false)

function start() {
  setCount(3); setVisible(true)
  setTimeout(() => setCount(2), 1000)
  setTimeout(() => setCount(1), 2000)
  setTimeout(() => setVisible(false), 3000)
}

<CountdownSplash count={count} visible={visible} />`

const toastSnippet = `const [toasts, setToasts] = useState<ToastItem[]>([])

function addToast(type: ToastItem['type'], message: string) {
  const id = crypto.randomUUID()
  setToasts(prev => [...prev, { id, type, message }])
  setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
}

<ToastStack toasts={toasts} />`

const pulseRingSnippet = `<PulseRing active={active} color="var(--kui-primary)">
  <Avatar initial="K" size="lg" />
</PulseRing>`

// ─── Demos ────────────────────────────────────────────────────────────────────

function ConfettiBurstDemo() {
  const [active, setActive] = useState(false)

  function trigger() {
    setActive(true)
    setTimeout(() => setActive(false), 2000)
  }

  return (
    <div style={{ position: 'relative', minHeight: 120, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ConfettiBurst active={active} count={48} />
      <button
        onClick={trigger}
        disabled={active}
        style={{
          padding: '10px 24px',
          borderRadius: 'var(--kui-radius-md)',
          border: '1.5px solid var(--kui-primary)',
          background: active ? 'var(--kui-surface-2)' : 'var(--kui-primary)',
          color: active ? 'var(--kui-primary)' : '#fff',
          cursor: active ? 'not-allowed' : 'pointer',
          fontWeight: 700,
          fontSize: '14px',
          fontFamily: 'var(--kui-font-sans)',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.2s',
        }}
      >
        {active ? '🎊 Bursting…' : '🎊 Burst!'}
      </button>
    </div>
  )
}

function CountdownSplashDemo() {
  const [count, setCount]     = useState(3)
  const [visible, setVisible] = useState(false)

  const start = useCallback(() => {
    setCount(3)
    setVisible(true)
    setTimeout(() => setCount(2), 1000)
    setTimeout(() => setCount(1), 2000)
    setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', minHeight: 80, justifyContent: 'center' }}>
      <CountdownSplash count={count} visible={visible} />
      <button
        onClick={start}
        disabled={visible}
        style={{
          padding: '10px 24px',
          borderRadius: 'var(--kui-radius-md)',
          border: '1.5px solid var(--kui-primary)',
          background: visible ? 'var(--kui-surface-2)' : 'var(--kui-primary)',
          color: visible ? 'var(--kui-primary)' : '#fff',
          cursor: visible ? 'not-allowed' : 'pointer',
          fontWeight: 700,
          fontSize: '14px',
          fontFamily: 'var(--kui-font-sans)',
        }}
      >
        {visible ? '⏳ Counting…' : '▶ Start 3-2-1'}
      </button>
    </div>
  )
}

let _toastId = 1

function ToastStackDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  function add(type: ToastItem['type'], message: string, emoji: string) {
    const id = String(_toastId++)
    setToasts(prev => [...prev, { id, type, message, emoji }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--kui-text-muted)', fontFamily: 'var(--kui-font-sans)' }}>
        Toasts appear bottom-right and auto-dismiss after 3 s.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => add('info',    'Game is starting!',   '🎮')} style={toastBtn('#3182ce')}>Info</button>
        <button onClick={() => add('success', 'Vote submitted!',      '✅')} style={toastBtn('#38a169')}>Success</button>
        <button onClick={() => add('danger',  'You were eliminated!', '💀')} style={toastBtn('#e53e3e')}>Danger</button>
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}

function toastBtn(bg: string): React.CSSProperties {
  return {
    padding: '7px 16px',
    borderRadius: 'var(--kui-radius-sm)',
    border: `1.5px solid ${bg}`,
    background: bg,
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '13px',
    fontFamily: 'var(--kui-font-sans)',
  }
}

const RING_COLORS = ['var(--kui-primary)', '#9f7aea', '#38a169', '#e53e3e', '#f6ad55']

function PulseRingDemo() {
  const [active, setActive] = useState(true)
  const [ci, setCi] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', minHeight: 100, justifyContent: 'center' }}>
      <PulseRing active={active} color={RING_COLORS[ci]} style={{ borderRadius: '50%' }}>
        <div style={{
          width: 64, height: 64,
          borderRadius: '50%',
          background: RING_COLORS[ci],
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--kui-font-display)',
          fontWeight: 800,
          fontSize: '1.5rem',
          border: '2px solid rgba(0,0,0,0.15)',
          transition: 'background 0.25s',
        }}>K</div>
      </PulseRing>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => setActive(v => !v)}
          style={{
            padding: '5px 14px',
            borderRadius: 'var(--kui-radius-full)',
            border: '1.5px solid var(--kui-border)',
            background: active ? 'var(--kui-primary)' : 'transparent',
            color: active ? '#fff' : 'var(--kui-text)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '12px',
            fontFamily: 'var(--kui-font-sans)',
          }}
        >{active ? 'Pulsing' : 'Idle'}</button>
        {RING_COLORS.map((c, i) => (
          <button
            key={c}
            onClick={() => setCi(i)}
            aria-label={`Color ${i + 1}`}
            style={{
              width: 24, height: 24,
              borderRadius: '50%',
              border: ci === i ? '2.5px solid var(--kui-text)' : '2px solid transparent',
              background: c,
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Zone ─────────────────────────────────────────────────────────────────────

export function FunZone() {
  return (
    <section id="fun" className="docs-zone docs-zone--fun">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎉</span>
        <h2 className="docs-zone__title">Fun Zone</h2>
        <p className="docs-zone__subtitle">
          Celebratory and ambient UI — confetti bursts, countdown splashes, toast notifications, and pulse rings.
        </p>
      </div>
      <div className="docs-zone__booths">
        <Booth id="confetti" emoji="🎊" title="ConfettiBurst" description="Absolute-positioned confetti shower. Mount inside a position:relative container. Pure CSS — no canvas, no external deps." props={confettiProps} snippet={confettiSnippet}>
          <ConfettiBurstDemo />
        </Booth>

        <Booth id="countdown" emoji="⏳" title="CountdownSplash" description="Fixed full-screen overlay with a giant animated number. Change the count prop to restart the pop animation via key remounting." props={countdownProps} snippet={countdownSnippet}>
          <CountdownSplashDemo />
        </Booth>

        <Booth id="toaststack" emoji="🔔" title="ToastStack" description="Fixed bottom-right toast stack. Supports info, success, and danger types with optional emoji prefix. Auto-dismiss by removing from the array." props={toastProps} snippet={toastSnippet}>
          <ToastStackDemo />
        </Booth>

        <Booth id="pulsering" emoji="💫" title="PulseRing" description="Attention ring that expands and fades around any child. Customisable colour via the color prop. Commonly used to highlight active players." props={pulseRingProps} snippet={pulseRingSnippet}>
          <PulseRingDemo />
        </Booth>
      </div>
    </section>
  )
}
