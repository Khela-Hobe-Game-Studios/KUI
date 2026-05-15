import { useState } from 'react'
import {
  CategoryBadge,
  QuestionCard,
  AnswerInput,
  BettingPanel,
  RevealCard,
  FunFact,
  MiniLeaderboard,
} from '@khelahobe/kui/fixedprice'
import type { FpCategory } from '@khelahobe/kui/fixedprice'
import { Booth } from '../components/Booth'
import type { PropRow } from '../components/Booth'

// ─── Prop tables ──────────────────────────────────────────────────────────────

const categoryBadgeProps: PropRow[] = [
  { name: 'category',  type: "'desh' | 'cricket' | 'taka' | 'global' | 'weird'", required: true, description: 'Selects label + color treatment.' },
  { name: 'className', type: 'string', description: 'Extra class forwarded to the root.' },
]

const questionCardProps: PropRow[] = [
  { name: 'question', type: 'string',     required: true, description: 'The question text to display.' },
  { name: 'unit',     type: 'string',     description: 'Unit hint shown below the question.' },
  { name: 'category', type: 'FpCategory', description: 'Renders a CategoryBadge in the meta row.' },
  { name: 'round',    type: 'number',     description: 'Current round number for the meta row.' },
  { name: 'total',    type: 'number',     description: 'Total rounds, paired with `round`.' },
]

const answerInputProps: PropRow[] = [
  { name: 'unit',        type: 'string',                description: 'Optional inline unit shown right of the input.' },
  { name: 'accentColor', type: 'string',                description: 'CSS color for focus ring / shadow tint.' },
  { name: 'onSubmit',    type: '(value: string) => void', description: 'Called on Enter key.' },
]

const bettingPanelProps: PropRow[] = [
  { name: 'options',     type: 'BetOption[]',           required: true, description: 'Players to bet on.' },
  { name: 'selectedBet', type: 'string',                description: 'Currently selected option id.' },
  { name: 'onBet',       type: '(id: string) => void',  required: true, description: 'Called when a row is clicked.' },
]

const revealCardProps: PropRow[] = [
  { name: 'rank',     type: 'number', required: true, description: 'Display rank (#1, #2…).' },
  { name: 'name',     type: 'string', required: true, description: 'Player name.' },
  { name: 'initial',  type: 'string', required: true, description: 'Avatar initial.' },
  { name: 'guess',    type: 'number | string | null', required: true, description: 'Submitted answer (null = no submit).' },
  { name: 'distance', type: 'number | null', description: 'Absolute distance from correct answer.' },
  { name: 'points',   type: 'number', description: 'Points earned this round.' },
  { name: 'unit',     type: 'string', description: 'Unit appended to the guess.' },
  { name: 'isWinner', type: 'boolean', default: 'false', description: 'Apply winner glow + crown.' },
  { name: 'isMe',     type: 'boolean', default: 'false', description: 'Highlight as the current player.' },
]

const funFactProps: PropRow[] = [
  { name: 'text',  type: 'string', required: true, description: 'The fact text.' },
  { name: 'label', type: 'string', default: "'💡 Fun fact'", description: 'Override the label.' },
]

const miniLeaderboardProps: PropRow[] = [
  { name: 'players',         type: 'LeaderboardEntry[]', required: true, description: 'All players (already ranked).' },
  { name: 'currentPlayerId', type: 'string', description: 'When set, pins this player\'s row at the bottom if outside top.' },
  { name: 'maxShow',         type: 'number', default: '5', description: 'Number of top rows to render.' },
]

// ─── Snippets ─────────────────────────────────────────────────────────────────

const catBadgeSnippet = `<CategoryBadge category="cricket" />`

const questionCardSnippet = `<QuestionCard
  question="What is the population of Dhaka?"
  unit="million"
  category="desh"
  round={3}
  total={10}
/>`

const answerInputSnippet = `<AnswerInput
  placeholder="0"
  unit="million"
  accentColor="#f59e0b"
  onSubmit={v => console.log(v)}
/>`

const bettingPanelSnippet = `<BettingPanel
  options={[
    { id: '1', name: 'Karim', initial: 'K', rank: 1, score: 9 },
    { id: '2', name: 'Rahim', initial: 'R', rank: 2, score: 7 },
  ]}
  selectedBet={bet}
  onBet={setBet}
/>`

const revealCardSnippet = `<RevealCard
  rank={1}
  name="Karim"
  initial="K"
  guess={20}
  distance={2}
  points={3}
  unit="million"
  isWinner
/>`

const funFactSnippet = `<FunFact text="Dhaka is one of the most densely populated cities in the world." />`

const miniLeaderboardSnippet = `<MiniLeaderboard
  players={leaderboard}
  currentPlayerId="me"
  maxShow={5}
/>`

// ─── Demos ────────────────────────────────────────────────────────────────────

function CategoryBadgeDemo() {
  const cats: FpCategory[] = ['desh', 'cricket', 'taka', 'global', 'weird']
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {cats.map(c => <CategoryBadge key={c} category={c} />)}
    </div>
  )
}

function QuestionCardDemo() {
  return (
    <QuestionCard
      question="How many runs did Shakib Al Hasan score in his last ODI innings?"
      unit="runs"
      category="cricket"
      round={5}
      total={10}
    />
  )
}

function AnswerInputDemo() {
  const [val, setVal] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360 }}>
      <AnswerInput
        value={val}
        placeholder="0"
        unit="million"
        accentColor="#f59e0b"
        onChange={e => setVal(e.target.value)}
        onSubmit={v => alert(`submitted: ${v}`)}
      />
      <p style={{ fontSize: 12, color: 'var(--kui-text-muted)', margin: 0 }}>Press Enter to submit</p>
    </div>
  )
}

function BettingPanelDemo() {
  const [bet, setBet] = useState<string>()
  const options = [
    { id: '1', name: 'Karim',  initial: 'K', rank: 1, score: 9 },
    { id: '2', name: 'Rahim',  initial: 'R', rank: 2, score: 7 },
    { id: '3', name: 'Sumaiya', initial: 'S', rank: 3, score: 5 },
  ]
  return <BettingPanel options={options} selectedBet={bet} onBet={setBet} />
}

function RevealCardDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <RevealCard rank={1} name="Karim"  initial="K" guess={20} distance={2}  points={3} unit="million" isWinner />
      <RevealCard rank={2} name="Sumaiya" initial="S" guess={18} distance={4}  points={1} unit="million" isMe />
      <RevealCard rank={3} name="Rahim"  initial="R" guess={32} distance={10} unit="million" />
      <RevealCard rank={4} name="Selim"  initial="S" guess={null} distance={null} />
    </div>
  )
}

function FunFactDemo() {
  return <FunFact text="Dhaka has more rickshaws than any other city — over 600,000 on the streets." />
}

function MiniLeaderboardDemo() {
  const players = [
    { id: '1', rank: 1, name: 'Karim',  initial: 'K', score: 14 },
    { id: '2', rank: 2, name: 'Rahim',  initial: 'R', score: 11 },
    { id: '3', rank: 3, name: 'Sumaiya', initial: 'S', score: 9 },
    { id: '4', rank: 4, name: 'Selim',  initial: 'S', score: 7 },
    { id: '5', rank: 5, name: 'Tania',  initial: 'T', score: 5 },
    { id: 'me', rank: 8, name: 'You',   initial: 'Y', score: 2 },
  ]
  return <MiniLeaderboard players={players} currentPlayerId="me" />
}

// ─── Zone ─────────────────────────────────────────────────────────────────────

export function FixedPriceZone() {
  return (
    <section id="fixedprice" className="docs-zone docs-zone--cpdb">
      <div className="docs-zone__header">
        <span className="docs-zone__emoji">🇧🇩</span>
        <h2 className="docs-zone__title">FixedPrice Zone</h2>
        <p className="docs-zone__subtitle">
          Components for the এক দাম / Fixed Price party game — questions, answers, bets, reveals, and leaderboards.
        </p>
      </div>
      <div className="docs-zone__booths">
        <Booth id="categorybadge" emoji="🏷️" title="CategoryBadge" description="Color-coded category pill (Desh, Cricket, Taka, Global, Weird) with desi-tinted treatment." props={categoryBadgeProps} snippet={catBadgeSnippet}>
          <CategoryBadgeDemo />
        </Booth>

        <Booth id="questioncard" emoji="❓" title="QuestionCard" description="Large question card with category badge, round counter, and unit hint." props={questionCardProps} snippet={questionCardSnippet}>
          <QuestionCardDemo />
        </Booth>

        <Booth id="answerinput" emoji="🔢" title="AnswerInput" description="Big centered numeric input with optional unit and per-category accent color." props={answerInputProps} snippet={answerInputSnippet}>
          <AnswerInputDemo />
        </Booth>

        <Booth id="bettingpanel" emoji="🎯" title="BettingPanel" description="Selectable list of players to bet on. Selected row pops with the secondary color." props={bettingPanelProps} snippet={bettingPanelSnippet}>
          <BettingPanelDemo />
        </Booth>

        <Booth id="revealcard" emoji="🎉" title="RevealCard" description="Per-player row shown in the reveal phase — rank, guess, distance, points, winner glow." props={revealCardProps} snippet={revealCardSnippet}>
          <RevealCardDemo />
        </Booth>

        <Booth id="funfact" emoji="💡" title="FunFact" description="Italic fact line shown beneath the correct answer." props={funFactProps} snippet={funFactSnippet}>
          <FunFactDemo />
        </Booth>

        <Booth id="minileaderboard" emoji="📊" title="MiniLeaderboard" description="Top-N leaderboard that pins the current player's row at the bottom when they're outside the top." props={miniLeaderboardProps} snippet={miniLeaderboardSnippet}>
          <MiniLeaderboardDemo />
        </Booth>
      </div>
    </section>
  )
}
