import { useState } from 'react'
import { ProgressBar, Leaderboard, Podium, PlayerCard } from '@khelahobe/kui'
import type { LeaderboardEntry } from '@khelahobe/kui'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ── static sample data ────────────────────────────────────────────────────────

const LEADERBOARD_PLAYERS: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Alice',   initial: 'A', score: 420, isMe: true  },
  { id: '2', rank: 2, name: 'Bob',     initial: 'B', score: 380              },
  { id: '3', rank: 3, name: 'Carol',   initial: 'C', score: 310              },
  { id: '4', rank: 4, name: 'Dan',     initial: 'D', score: 275, eliminated: true },
  { id: '5', rank: 5, name: 'Evelyn',  initial: 'E', score: 190              },
]

const PODIUM_WINNERS = [
  { rank: 1 as const, name: 'Alice', initial: 'A', score: 420 },
  { rank: 2 as const, name: 'Bob',   initial: 'B', score: 380 },
  { rank: 3 as const, name: 'Carol', initial: 'C', score: 310 },
]

// ── prop rows ─────────────────────────────────────────────────────────────────

const progressBarProps: PropRow[] = [
  { name: 'value',     type: 'number',  required: true,         description: 'Progress value from 0 to 100. Clamped automatically.' },
  { name: 'label',     type: 'string',                          description: 'Descriptive label rendered above the track.' },
  { name: 'showCount', type: 'boolean', default: 'false',       description: 'Shows the numeric percentage alongside the label.' },
  { name: 'color',     type: 'string',                          description: 'CSS color override for the fill track.' },
  { name: 'className', type: 'string',                          description: 'Extra class names forwarded to the root element.' },
]

const playerCardProps: PropRow[] = [
  { name: 'name',      type: 'string',                                                          required: true, description: 'Player display name.' },
  { name: 'initial',   type: 'string',                                                          required: true, description: 'Single character used inside the avatar.' },
  { name: 'status',    type: "'waiting' | 'answered' | 'locked' | 'eliminated'", default: "'waiting'",         description: 'Current player state — drives visual treatment.' },
  { name: 'isMe',      type: 'boolean',  default: 'false',                                                     description: 'Highlights the local player with a "You" badge.' },
  { name: 'color',     type: 'string',                                                                          description: 'CSS color override for the avatar background.' },
  { name: 'variant',   type: "'grid' | 'list'",                  default: "'list'",                            description: 'Layout mode — list stacks horizontally, grid is square.' },
  { name: 'className', type: 'string',                                                                          description: 'Extra class names forwarded to the root element.' },
]

const leaderboardProps: PropRow[] = [
  { name: 'players',   type: 'LeaderboardEntry[]', required: true, description: 'Sorted array of player entries to render.' },
  { name: 'maxShow',   type: 'number',                             description: 'Limits how many rows are rendered from the top of the array.' },
  { name: 'className', type: 'string',                             description: 'Extra class names forwarded to the root element.' },
]

const podiumProps: PropRow[] = [
  { name: 'winners',   type: 'PodiumEntry[]', required: true, description: 'Exactly three entries with rank 1, 2, and 3. Rendered in 2nd–1st–3rd podium order.' },
  { name: 'className', type: 'string',                        description: 'Extra class names forwarded to the root element.' },
]

// ── snippets ──────────────────────────────────────────────────────────────────

const PROGRESS_BAR_SNIPPET = `// Controlled by a range slider
const [value, setValue] = useState(60)

<ProgressBar value={value} label="Votes in" showCount />
<input
  type="range"
  min={0} max={100}
  value={value}
  onChange={e => setValue(Number(e.target.value))}
/>

// Color override
<ProgressBar value={80} label="Time left" showCount color="var(--kui-warning)" />`

const PLAYER_CARD_SNIPPET = `// All four statuses
<PlayerCard name="Alice"  initial="A" status="waiting"    isMe />
<PlayerCard name="Bob"    initial="B" status="answered" />
<PlayerCard name="Carol"  initial="C" status="locked" />
<PlayerCard name="Dan"    initial="D" status="eliminated" />

// Grid layout variant
<PlayerCard name="Alice" initial="A" variant="grid" status="answered" />`

const LEADERBOARD_SNIPPET = `import type { LeaderboardEntry } from '@khelahobe/kui'

const players: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Alice',  initial: 'A', score: 420, isMe: true },
  { id: '2', rank: 2, name: 'Bob',    initial: 'B', score: 380 },
  { id: '3', rank: 3, name: 'Carol',  initial: 'C', score: 310 },
  { id: '4', rank: 4, name: 'Dan',    initial: 'D', score: 275, eliminated: true },
  { id: '5', rank: 5, name: 'Evelyn', initial: 'E', score: 190 },
]

<Leaderboard players={players} maxShow={5} />`

const PODIUM_SNIPPET = `<Podium
  winners={[
    { rank: 1, name: 'Alice', initial: 'A', score: 420 },
    { rank: 2, name: 'Bob',   initial: 'B', score: 380 },
    { rank: 3, name: 'Carol', initial: 'C', score: 310 },
  ]}
/>`

// ── ProgressBar demo ──────────────────────────────────────────────────────────

function ProgressBarDemo() {
  const [value, setValue] = useState<number>(60)

  return (
    <div className="docs-demo docs-demo--progressbar">
      <div className="docs-demo__stage docs-demo__stage--padded">
        <ProgressBar value={value} label="Votes in" showCount />
        <ProgressBar
          value={100 - value}
          label="Time left"
          showCount
          color="var(--kui-color-warning, #f59e0b)"
        />
      </div>
      <div className="docs-demo__controls">
        <label className="docs-demo__slider-label">
          <span>value: {value}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            className="docs-demo__slider"
          />
        </label>
      </div>
    </div>
  )
}

// ── PlayerCard demo ───────────────────────────────────────────────────────────

const STATUSES = ['waiting', 'answered', 'locked', 'eliminated'] as const
type PlayerStatus = (typeof STATUSES)[number]

const STATUS_PLAYERS: Array<{ name: string; initial: string; status: PlayerStatus; isMe?: boolean }> = [
  { name: 'Alice',  initial: 'A', status: 'waiting',    isMe: true },
  { name: 'Bob',    initial: 'B', status: 'answered'               },
  { name: 'Carol',  initial: 'C', status: 'locked'                 },
  { name: 'Dan',    initial: 'D', status: 'eliminated'             },
]

function PlayerCardDemo() {
  return (
    <div className="docs-demo docs-demo--playercard">
      <div className="docs-demo__stack">
        {STATUS_PLAYERS.map(p => (
          <div key={p.status} className="docs-demo__playercard-row">
            <span className="docs-demo__status-label">{p.status}</span>
            <PlayerCard
              name={p.name}
              initial={p.initial}
              status={p.status}
              isMe={p.isMe}
              variant="list"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Leaderboard demo ──────────────────────────────────────────────────────────

function LeaderboardDemo() {
  const [maxShow, setMaxShow] = useState<number>(5)

  return (
    <div className="docs-demo docs-demo--leaderboard">
      <div className="docs-demo__stage docs-demo__stage--padded">
        <Leaderboard players={LEADERBOARD_PLAYERS} maxShow={maxShow} />
      </div>
      <div className="docs-demo__controls">
        <label className="docs-demo__slider-label">
          <span>maxShow: {maxShow}</span>
          <input
            type="range"
            min={1}
            max={LEADERBOARD_PLAYERS.length}
            value={maxShow}
            onChange={e => setMaxShow(Number(e.target.value))}
            className="docs-demo__slider"
          />
        </label>
      </div>
    </div>
  )
}

// ── Podium demo ───────────────────────────────────────────────────────────────

function PodiumDemo() {
  return (
    <div className="docs-demo docs-demo--podium">
      <div className="docs-demo__stage docs-demo__stage--padded">
        <Podium winners={PODIUM_WINNERS} />
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function DataZone() {
  return (
    <section id="data" className="docs-zone docs-zone--data">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🎠</span>
        <h2 className="docs-zone__title">Data Zone</h2>
        <p className="docs-zone__subtitle">
          Live game data components — progress tracking, player status grids,
          ranked leaderboards, and the end-of-game podium.
        </p>
      </div>

      <div className="docs-zone__booths">
        <Booth
          id="progressbar"
          emoji="📊"
          title="ProgressBar"
          description="Displays a bounded value from 0–100 with an optional label and percentage readout. Drag the slider to see it animate."
          props={progressBarProps}
          snippet={PROGRESS_BAR_SNIPPET}
        >
          <ProgressBarDemo />
        </Booth>

        <Booth
          id="playercard"
          emoji="🧑"
          title="PlayerCard"
          description="Shows a single player's avatar, name, and current game status. All four statuses are rendered side by side in list mode."
          props={playerCardProps}
          snippet={PLAYER_CARD_SNIPPET}
        >
          <PlayerCardDemo />
        </Booth>

        <Booth
          id="leaderboard"
          emoji="🏅"
          title="Leaderboard"
          description="Scrollable ranked player list. The local player row ('isMe') and eliminated players get distinct visual treatment. Use maxShow to paginate."
          props={leaderboardProps}
          snippet={LEADERBOARD_SNIPPET}
        >
          <LeaderboardDemo />
        </Booth>

        <Booth
          id="podium"
          emoji="🥇"
          title="Podium"
          description="End-of-game podium for the top three finishers. Always rendered in 2nd–1st–3rd visual order with medal decorations."
          props={podiumProps}
          snippet={PODIUM_SNIPPET}
        >
          <PodiumDemo />
        </Booth>
      </div>
    </section>
  )
}
