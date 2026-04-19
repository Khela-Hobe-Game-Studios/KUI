# @khelahobe/kui — Master Spec

## Package
- npm scope: `@khelahobe/kui`
- React peer dep: `^19.0.0`
- Strict TypeScript, no `any`
- Every component: `className?`, `...rest` spread, `forwardRef` where applicable

## Export Paths
| import path              | contents                        |
|--------------------------|---------------------------------|
| `@khelahobe/kui`         | all base components             |
| `@khelahobe/kui/cpdb`    | Chor Police Daktar Babu components |
| `@khelahobe/kui/fixedprice` | Fixed Price game components  |
| `@khelahobe/kui/styles`  | compiled CSS (import once)      |

## Folder Template (copy for every component)
```
ComponentName/
  ComponentName.tsx   — component, forwardRef, ...rest
  ComponentName.scss  — only kui- prefixed classes
  index.ts            — export { ComponentName } from './ComponentName'
```

## CSS Variable Contract
All vars live under `[data-kui-theme]` on the KuiProvider wrapper div.

### Color tokens
| var                  | light            | dark             |
|----------------------|------------------|------------------|
| `--kui-bg`           | `#f8f9ff`        | `#0e0f1a`        |
| `--kui-surface`      | `#ffffff`        | `#13141f`        |
| `--kui-surface-2`    | `#f0f1ff`        | `#1c1d2e`        |
| `--kui-text`         | `#4a5568`        | `#f8f7ff`        |
| `--kui-text-muted`   | `#718096`        | `#8b8fa8`        |
| `--kui-border`       | `#6b73ff`        | `#7b84ff`        |
| `--kui-primary`      | `#6b73ff`        | `#8b94ff`        |
| `--kui-secondary`    | `#ff9a9e`        | `#ff9a9e`        |
| `--kui-tertiary`     | `#ff6b6b`        | `#ff8080`        |
| `--kui-shadow-color` | `#3b42cc`        | `#1a1b3a`        |

### Shadow tokens
```
--kui-shadow-sm:      3px 3px 0 var(--kui-shadow-color)
--kui-shadow-md:      4px 4px 0 var(--kui-shadow-color)
--kui-shadow-lg:      6px 6px 0 var(--kui-shadow-color)
--kui-shadow-pressed: 1px 1px 0 var(--kui-shadow-color)
```

### Spacing
```
--kui-space-1: 4px   --kui-space-2: 8px
--kui-space-3: 12px  --kui-space-4: 16px
--kui-space-5: 20px  --kui-space-6: 24px
--kui-space-8: 32px  --kui-space-10: 40px
```

### Border radius
```
--kui-radius-sm:   8px     --kui-radius-md:   12px
--kui-radius-lg:   16px    --kui-radius-xl:   20px
--kui-radius-full: 9999px
```

### Typography
```
--kui-font-sans:    'Inter', sans-serif
--kui-font-display: 'Poppins', sans-serif
--kui-font-bengali: 'Hind Siliguri', sans-serif
--kui-text-xs:   10px   --kui-text-sm:   12px
--kui-text-base: 14px   --kui-text-md:   16px
--kui-text-lg:   18px   --kui-text-xl:   20px
--kui-text-2xl:  24px   --kui-text-3xl:  32px
--kui-text-hero: clamp(2.5rem, 5vw, 4.5rem)
```

### Animation
```
--kui-duration-fast:   0.1s
--kui-duration-normal: 0.3s
--kui-duration-slow:   0.5s
--kui-easing:          ease
--kui-easing-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Z-index
```
--kui-z-dropdown: 100    --kui-z-sticky:  200
--kui-z-overlay:  900    --kui-z-modal:   1000
--kui-z-toast:    1100   --kui-z-tooltip: 1200
```

## Theme System
KuiProvider writes `data-kui-theme="light|dark"` to a wrapper div.
All CSS vars scoped to `[data-kui-theme]` — never `:root`.
Consumers wrap their app: `<KuiProvider theme="chor" colorMode="dark">`.

Built-in themes: `default | chor | police | daktar`  
colorMode: `light | dark`

## Component Interfaces

### Base Components

```ts
// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   'primary' | 'secondary' | 'ghost'
  size?:      'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  as?:        React.ElementType
  className?: string
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:       string
  error?:       string
  className?:   string
}

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:     string
  error?:     string
  options:    { value: string; label: string }[]
  className?: string
}

// Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'secondary' | 'ghost'
  className?: string
  children:   React.ReactNode
}
// Compound: Card.Header, Card.Body, Card.Footer

// Badge
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:   'default' | 'night' | 'day' | 'voting' | 'lobby' | 'success' | 'danger'
  pulse?:     boolean
  className?: string
  children:   React.ReactNode
}

// Avatar
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initial:     string
  size?:       'sm' | 'md' | 'lg' | 'xl'
  color?:      string
  isWinner?:   boolean
  className?:  string
}

// RoomCode
interface RoomCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  code:       string
  label?:     string
  size?:      'sm' | 'lg'
  className?: string
}

// PlayerCard
interface PlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name:       string
  initial:    string
  status?:    'waiting' | 'answered' | 'locked' | 'eliminated'
  isMe?:      boolean
  color?:     string
  variant?:   'grid' | 'list'
  className?: string
}

// ProgressBar
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value:        number        // 0-100
  label?:       string
  showCount?:   boolean
  color?:       string
  className?:   string
}

// Timer
interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds:      number
  totalSeconds?: number
  color?:       string
  size?:        'sm' | 'md' | 'lg'
  className?:   string
}

// WinnerDisplay
interface WinnerDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  winners:    { name: string; initial: string; score?: number }[]
  animated?:  boolean
  className?: string
}

// Leaderboard
interface LeaderboardEntry {
  id:        string
  rank:      number
  name:      string
  initial:   string
  score:     number
  isMe?:     boolean
  eliminated?: boolean
}
interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  players:    LeaderboardEntry[]
  maxShow?:   number
  className?: string
}

// Podium
interface PodiumProps extends React.HTMLAttributes<HTMLDivElement> {
  winners:    { rank: 1|2|3; name: string; initial: string; score: number }[]
  className?: string
}

// LoadingDot
interface LoadingDotProps extends React.HTMLAttributes<HTMLDivElement> {
  message?:   string
  subtext?:   string
  className?: string
}

// SettingsPanel
interface SettingsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  settings:   { key: string; value: string; isActive?: boolean }[]
  className?: string
}

// TitleBlock
interface TitleBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title:      string
  subtitle?:  string
  tagline?:   string
  watermark?: string
  className?: string
}

// PageBackground
interface PageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'dark'
  className?: string
}
```

### CPDB Game Components

```ts
// PlayerList
interface CpdbPlayer {
  id:     string
  name:   string
  alive?: boolean
  role?:  string
}
interface PlayerListProps {
  players:            Record<string, CpdbPlayer>
  playerId:           string
  myRole?:            string | null
  lastInvestigation?: { policeId: string; targetId: string; isChor: boolean } | null
  className?:         string
}

// RoleBadge
interface RoleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  role:       'chor' | 'daktar' | 'police' | 'babu'
  className?: string
}

// RoleDisplay
interface RoleDisplayProps {
  myRole:           string | null
  showRole:         boolean
  onToggleShowRole: () => void
  className?:       string
}

// NightActions
interface NightActionsProps {
  myRole:        string
  gameCode:      string
  playerId:      string
  livingPlayers: Record<string, CpdbPlayer>
  canAct:        boolean
  onAction:      (target: string) => Promise<void>
  className?:    string
}

// Voting
interface VotingProps {
  gameCode:      string
  playerId:      string
  livingPlayers: Record<string, CpdbPlayer>
  isHost:        boolean
  canVote:       boolean
  onVote:        (target: string) => Promise<void>
  onFinalize?:   () => Promise<void>
  className?:    string
}

// ConfigureRoles
interface RoleConfig { chor: number; daktar: number; police: number; babu: number }
interface ConfigureRolesProps {
  roles:          RoleConfig
  totalPlayers:   number
  onRolesChange:  (roles: RoleConfig) => Promise<void>
  onStartGame:    () => Promise<void>
  className?:     string
}

// Announcements
interface AnnouncementsProps {
  lastDeath?:         string | null
  lastElimination?:   string | null
  lastInvestigation?: { policeId: string; targetId: string; isChor: boolean } | null
  players:            Record<string, { name: string; alive?: boolean }>
  playerId:           string
  className?:         string
}

// GameHeader
interface GameHeaderProps {
  phase?:          string | null
  round?:          number
  isHost:          boolean
  gameEnded?:      boolean
  onNextPhase?:    () => void
  onResolveNight?: () => void
  className?:      string
}

// CreateGameBar
interface CreateGameBarProps {
  name:             string
  gameCode:         string
  onNameChange:     (v: string) => void
  onGameCodeChange: (v: string) => void
  onCreate:         () => Promise<void>
  onJoin:           () => Promise<void>
  className?:       string
}
```

### FixedPrice Game Components

```ts
// QuestionCard
interface QuestionCardProps {
  question:   string
  unit?:      string
  category?:  string
  round?:     number
  className?: string
}

// AnswerInput
interface AnswerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unit?:       string
  accentColor?: string
  onSubmit?:   (value: string) => void
  className?:  string
}

// BettingPanel
interface BetOption { id: string; name: string; initial: string; score: number; rank: number }
interface BettingPanelProps {
  options:      BetOption[]
  selectedBet?: string
  onBet:        (id: string) => void
  className?:   string
}

// RevealCard
interface RevealCardProps {
  rank:          number
  name:          string
  initial:       string
  guess:         number | string
  correctAnswer: number | string
  distance?:     number
  points:        number
  isWinner?:     boolean
  isMe?:         boolean
  className?:    string
}

// CategoryBadge
type FpCategory = 'desh' | 'cricket' | 'taka' | 'global' | 'weird'
interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category:   FpCategory
  className?: string
}

// FunFact
interface FunFactProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text:       string
  label?:     string
  className?: string
}

// MiniLeaderboard
interface MiniLeaderboardProps {
  players:          LeaderboardEntry[]
  currentPlayerId?: string
  maxShow?:         number
  className?:       string
}
```

## KuiProvider API
```ts
type KuiTheme    = 'default' | 'chor' | 'police' | 'daktar'
type KuiColorMode = 'light' | 'dark'

interface KuiProviderProps {
  theme?:     KuiTheme
  colorMode?: KuiColorMode
  children:   React.ReactNode
  className?: string
}
```
