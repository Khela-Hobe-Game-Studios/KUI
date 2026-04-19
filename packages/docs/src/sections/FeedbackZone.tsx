import { useState, useEffect } from 'react'
import { WinnerDisplay, LoadingDot, Timer } from '@khelahobe/kui'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ─── Prop tables ──────────────────────────────────────────────────────────────

const winnerDisplayProps: PropRow[] = [
  {
    name: 'winners',
    type: 'Array<{ name: string; initial: string; score?: number }>',
    required: true,
    description: 'List of winner entries. Each renders with an Avatar, name, and optional score.',
  },
  {
    name: 'animated',
    type: 'boolean',
    default: 'true',
    description: 'When true, applies an entrance animation to the display.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Optional extra class name forwarded to the root element.',
  },
]

const loadingDotProps: PropRow[] = [
  {
    name: 'message',
    type: 'string',
    default: '"Waiting…"',
    description: 'Primary status text shown next to the animated dot.',
  },
  {
    name: 'subtext',
    type: 'string',
    description: 'Secondary line displayed below the main message. Omit to hide.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Optional extra class name forwarded to the root element.',
  },
]

const timerProps: PropRow[] = [
  {
    name: 'seconds',
    type: 'number',
    required: true,
    description: 'Current number of seconds to display. Pass a live value to animate the countdown.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'Controls font size and padding of the timer digit.',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Optional CSS color string applied inline, overriding the theme color.',
  },
  {
    name: 'totalSeconds',
    type: 'number',
    description: 'Total duration — can be used to drive an external progress indicator.',
  },
]

// ─── Code snippets ────────────────────────────────────────────────────────────

const winnerDisplaySnippet = `<WinnerDisplay
  winners={[
    { name: 'Alice',  initial: 'A', score: 420 },
    { name: 'Bashir', initial: 'B', score: 310 },
  ]}
  animated
/>`

const loadingDotSnippet = `<LoadingDot
  message="Waiting for players…"
  subtext="3 of 6 joined"
/>`

const timerSnippet = `const [seconds, setSeconds] = useState(30)

useEffect(() => {
  if (seconds <= 0) return
  const id = setInterval(() => setSeconds(s => s - 1), 1000)
  return () => clearInterval(id)
}, [seconds])

// Automatically switches to urgent style when seconds <= 5
<Timer seconds={seconds} size="lg" />`

// ─── WinnerDisplay demo ───────────────────────────────────────────────────────

interface WinnerEntry {
  name: string
  initial: string
  score: number
}

function WinnerDisplayDemo() {
  const [inputName, setInputName] = useState<string>('')
  const [showScore, setShowScore] = useState<boolean>(true)
  const [winners, setWinners] = useState<WinnerEntry[]>([
    { name: 'Alice', initial: 'A', score: 420 },
  ])

  function crownWinner() {
    const trimmed = inputName.trim()
    if (!trimmed) return
    const initial = trimmed.charAt(0).toUpperCase()
    const score = Math.floor(Math.random() * 400) + 100
    setWinners([{ name: trimmed, initial, score }])
    setInputName('')
  }

  const displayWinners = showScore
    ? winners
    : winners.map(({ name, initial }) => ({ name, initial }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <WinnerDisplay winners={displayWinners} animated />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter winner name…"
          value={inputName}
          onChange={e => setInputName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') crownWinner() }}
          style={{
            flex: '1 1 140px',
            minWidth: 0,
            padding: '6px 10px',
            border: '2px solid var(--kui-border)',
            borderRadius: 'var(--kui-radius-sm)',
            background: 'var(--kui-surface)',
            color: 'var(--kui-text)',
            fontSize: '13px',
            fontFamily: 'var(--kui-font-sans)',
          }}
        />
        <button
          onClick={crownWinner}
          disabled={!inputName.trim()}
          style={{
            padding: '6px 14px',
            border: '2px solid var(--kui-primary)',
            borderRadius: 'var(--kui-radius-sm)',
            background: 'var(--kui-primary)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            cursor: inputName.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--kui-font-sans)',
            opacity: inputName.trim() ? 1 : 0.5,
          }}
        >
          👑 Crown
        </button>
        <label
          style={{
            fontSize: '13px',
            color: 'var(--kui-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={showScore}
            onChange={e => setShowScore(e.target.checked)}
          />
          Show score
        </label>
      </div>
    </div>
  )
}

// ─── LoadingDot demo ──────────────────────────────────────────────────────────

function LoadingDotDemo() {
  const [message, setMessage] = useState<string>('Waiting for players…')
  const [showSubtext, setShowSubtext] = useState<boolean>(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <LoadingDot
        message={message || 'Waiting…'}
        subtext={showSubtext ? '3 of 6 joined' : undefined}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Custom message…"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{
            flex: '1 1 160px',
            minWidth: 0,
            padding: '6px 10px',
            border: '2px solid var(--kui-border)',
            borderRadius: 'var(--kui-radius-sm)',
            background: 'var(--kui-surface)',
            color: 'var(--kui-text)',
            fontSize: '13px',
            fontFamily: 'var(--kui-font-sans)',
          }}
        />
        <label
          style={{
            fontSize: '13px',
            color: 'var(--kui-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={showSubtext}
            onChange={e => setShowSubtext(e.target.checked)}
          />
          Show subtext
        </label>
      </div>
    </div>
  )
}

// ─── Timer demo ───────────────────────────────────────────────────────────────

function TimerDemo() {
  const [seconds, setSeconds] = useState<number>(30)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Live countdown row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--kui-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            whiteSpace: 'nowrap',
          }}
        >
          Live
        </span>
        <Timer seconds={seconds} size="lg" />
        <button
          onClick={() => setSeconds(30)}
          style={{
            padding: '5px 12px',
            border: '2px solid var(--kui-border)',
            borderRadius: 'var(--kui-radius-sm)',
            background: 'var(--kui-surface)',
            color: 'var(--kui-text)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--kui-font-sans)',
          }}
        >
          Reset
        </button>
        {seconds <= 0 && (
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--kui-primary)' }}>
            Time's up!
          </span>
        )}
      </div>

      {/* All 3 sizes, static */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--kui-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            whiteSpace: 'nowrap',
            alignSelf: 'center',
          }}
        >
          Sizes
        </span>
        {(
          [
            { size: 'sm', val: 30, label: 'sm' },
            { size: 'md', val: 10, label: 'md' },
            { size: 'lg', val: 5,  label: 'lg · urgent' },
          ] as const
        ).map(({ size, val, label }) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--kui-text-muted)',
                marginBottom: '4px',
                fontWeight: 600,
              }}
            >
              {label}
            </div>
            <Timer seconds={val} size={size} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Zone ─────────────────────────────────────────────────────────────────────

export function FeedbackZone() {
  return (
    <section id="feedback" className="docs-zone docs-zone--feedback">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎭</span>
        <h2 className="docs-zone__title">Feedback Zone</h2>
        <p className="docs-zone__subtitle">
          Timers, loading states and winner ceremonies — the moments players remember.
        </p>
      </div>

      <div className="docs-zone__booths">
        <Booth
          id="winnerdisplay"
          emoji="🏆"
          title="WinnerDisplay"
          description="Celebrates the winner(s) with an animated avatar reveal. Supports multiple entries and optional scores."
          props={winnerDisplayProps}
          snippet={winnerDisplaySnippet}
        >
          <WinnerDisplayDemo />
        </Booth>

        <Booth
          id="loadingdot"
          emoji="⏳"
          title="LoadingDot"
          description="Pulsing indicator that tells players to hang tight. Supports an optional secondary status line."
          props={loadingDotProps}
          snippet={loadingDotSnippet}
        >
          <LoadingDotDemo />
        </Booth>

        <Booth
          id="timer"
          emoji="⏱️"
          title="Timer"
          description="Countdown display that automatically switches to urgent styling at 5 seconds. Available in sm, md, and lg sizes."
          props={timerProps}
          snippet={timerSnippet}
        >
          <TimerDemo />
        </Booth>
      </div>
    </section>
  )
}
