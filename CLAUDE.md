# @khelahobe/kui — Claude Context

## What this is
Khelahobe UI — cartoon-pastel React component library for games. Two shipped games: **Chor Police Daktar Babu (CPDB)** and **Fixed Price** (pending). React 19 + TypeScript strict + Vite 7 + SCSS. pnpm monorepo.

---

## Monorepo layout

```
packages/
  lib/    → @khelahobe/kui        (the library)
  docs/   → @khelahobe/kui-docs   (Vite showcase site)
pnpm-workspace.yaml
SPEC.md   → master interface spec (428 lines, full prop signatures)
```

**Root scripts:**
- `pnpm build` → builds lib only
- `pnpm dev`   → builds lib in watch mode
- `pnpm docs`  → runs docs dev server at localhost:5173

---

## Publishing

The library is published to npm as `@khelahobe/kui` (public, scoped under `@khelahobe` org).

**To release a new version:**
1. Bump `version` in `packages/lib/package.json`
2. Push to `main` with changes under `packages/lib/` — the GitHub Action (`.github/workflows/publish-lib.yml`) will build and publish automatically
3. Or manually trigger: `gh workflow run "Publish @khelahobe/kui" --repo Khela-Hobe-Game-Studios/KUI` (workflow_dispatch is enabled)

**Manual publish (local):**
```bash
cd packages/lib && pnpm build
NPM_TOKEN=$(grep NPM_ACCESS_TOKEN .env | cut -d= -f2)
npm publish --access public --//registry.npmjs.org/:_authToken=$NPM_TOKEN
```

**Secrets:**
- npm token lives in `packages/lib/.env` (gitignored) as `NPM_ACCESS_TOKEN`
- GitHub Actions uses repo secret `NPM_ACCESS_TOKEN` (set in Settings → Secrets → Actions)

**Gotchas:**
- npm will reject a publish if the version hasn't changed — always bump `packages/lib/package.json` version before a release push.
- Both workflows pin **pnpm to v10** (`pnpm/action-setup@v4` with `version: 10`). Do NOT use `version: latest`. pnpm v11 added a strict-builds gate (`ERR_PNPM_IGNORED_BUILDS`) that rejects `pnpm install --frozen-lockfile` unless every package with an install script (`@parcel/watcher`, `esbuild`) is pre-approved in the lockfile. We don't carry that approval, so v11 breaks CI. Two prior 0.2.0 publish attempts failed for exactly this reason — leaving versions 0.2.0 and 0.2.1 "burnt" (committed, never published); the live npm registry skips from 0.1.1 straight to whatever the next successful publish is.
- Both workflows use Node 22 (`actions/setup-node@v4` with `node-version: 22`). pnpm v10 still requires Node ≥18; v11 requires Node ≥22 — keep them in sync if you ever consider upgrading pnpm.

## Two CI workflows — don't confuse them

| Workflow | File | Trigger | What it does | Where the result shows up |
|---|---|---|---|---|
| **Deploy Docs** | `.github/workflows/deploy-docs.yml` | every push to main | Builds the Vite showcase under `packages/docs/`, deploys to GitHub Pages | The live docs/showcase website |
| **Publish @khelahobe/kui** | `.github/workflows/publish-lib.yml` | push to main touching `packages/lib/**`, or manual `workflow_dispatch` | Runs `npm publish` on `packages/lib/` | The npm registry — `npm install @khelahobe/kui` |

A successful **Deploy Docs** run only ships the website. It does NOT publish the npm package. If consumers report `npm install @khelahobe/kui` is still pulling an old version, check the **Publish** workflow, not Deploy Docs.

---

## packages/lib — the component library

### Source layout

```
src/
  components/base/      ← game-agnostic components (22 total)
  components/cpdb/      ← Chor Police Daktar Babu components (6 total)
  styles/               ← tokens.scss, base.scss, animations.scss
  types/index.ts        ← all shared TypeScript types
  utils/cn.ts           ← clsx wrapper
  index.ts              ← main barrel (@khelahobe/kui)
  cpdb.ts               ← CPDB barrel (@khelahobe/kui/cpdb)
  fixedprice.ts         ← FixedPrice barrel (stub, empty)
```

Each component folder has: `ComponentName.tsx`, `ComponentName.scss`, `index.ts`.

### Three export paths (package.json `exports`)
- `@khelahobe/kui`            → `dist/index.js` / `dist/index.d.ts`
- `@khelahobe/kui/cpdb`       → `dist/cpdb.js` / `dist/cpdb.d.ts`
- `@khelahobe/kui/fixedprice` → `dist/fixedprice.js` (empty stub)
- `@khelahobe/kui/styles`     → `dist/style.css`

Build produces CJS + ESM. All component CSS bundled into single `dist/style.css`. Run `pnpm build` in `packages/lib` after any component change — docs aliases point to source for dev, but TypeScript checks against dist types.

### cn() utility

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
export function cn(...inputs: ClassValue[]) { return clsx(inputs) }
```

Used in every component: `cn('kui-foo', variant && 'kui-foo--active', className)`

---

## Hard rules (never break these)

- ALL CSS classes prefixed `kui-` (BEM: `kui-component__element--modifier`)
- ALL CSS vars prefixed `--kui-` and scoped to `[data-kui-theme]`, **never `:root`**
- Every component accepts `className?` and spreads `...rest` onto the root element
- `forwardRef` on all input-like / button components (Button, Input, Select)
- TypeScript strict — no `any`
- Base components: **zero** game-specific logic
- CPDB/game components: **purely presentational** — no Firebase, no API calls, no state beyond display

---

## Types (src/types/index.ts)

```ts
type KuiTheme     = 'default' | 'chor' | 'police' | 'daktar'
type KuiColorMode = 'light' | 'dark'
type CpdbRole     = 'chor' | 'police' | 'daktar' | 'babu'
type CpdbPhase    = 'lobby' | 'night' | 'day' | 'voting' | 'results'

interface VoteTallyEntry {
  playerId: string; name: string; initial: string
  votes: number; isLeading?: boolean
}

interface ToastItem {
  id: string; message: string
  type?: 'info' | 'success' | 'danger'; emoji?: string
}

interface LeaderboardEntry {
  id: string; rank: number; name: string; initial: string
  score: number; isMe?: boolean; eliminated?: boolean
}

interface CpdbPlayer    { id: string; name: string; alive?: boolean; role?: string }
interface CpdbInvestigation { policeId: string; targetId: string; isChor: boolean }
interface CpdbRoleConfig    { chor: number; daktar: number; police: number; babu: number }
type FpCategory = 'desh' | 'cricket' | 'taka' | 'global' | 'weird'
```

---

## CSS design tokens (src/styles/tokens.scss)

All vars live on `[data-kui-theme]` (written by KuiProvider).

### Colors
```scss
/* Light */
--kui-bg: #f8f9ff          --kui-surface: #ffffff       --kui-surface-2: #f0f1ff
--kui-text: #4a5568         --kui-text-muted: #718096
--kui-border: #6b73ff       --kui-primary: #6b73ff       --kui-secondary: #ff9a9e
--kui-tertiary: #ff6b6b     --kui-accent: #6b73ff        --kui-shadow-color: #3b42cc

/* Dark  [data-kui-theme][data-kui-mode="dark"] */
--kui-bg: #0e0f1a           --kui-surface: #13141f       --kui-surface-2: #1c1d2e
--kui-text: #f8f7ff         --kui-text-muted: #8b8fa8
--kui-border: #7b84ff       --kui-primary: #8b94ff

/* Theme overrides */
[data-kui-theme="chor"]   → primary/border/shadow: #e53e3e / #9b2c2c
[data-kui-theme="police"] → primary/border/shadow: #3182ce / #2b6cb0
[data-kui-theme="daktar"] → primary/border/shadow: #38a169 / #276749
```

### Shadows (cartoon flat-offset, no blur)
```scss
--kui-shadow-sm:      3px 3px 0 var(--kui-shadow-color)
--kui-shadow-md:      4px 4px 0 var(--kui-shadow-color)
--kui-shadow-lg:      6px 6px 0 var(--kui-shadow-color)
--kui-shadow-pressed: 1px 1px 0 var(--kui-shadow-color)
```

### Spacing, radius, typography
```
Spacing:   --kui-space-1: 4px → -2: 8px → -3: 12px → -4: 16px → -5: 20px → -6: 24px → -8: 32px → -10: 40px
Radius:    --kui-radius-sm: 8px, -md: 12px, -lg: 16px, -xl: 20px, -full: 9999px
Fonts:     --kui-font-sans: 'Inter', --kui-font-display: 'Poppins', --kui-font-bengali: 'Hind Siliguri'
Text:      --kui-text-xs: 10px → -sm: 12px → -base: 14px → -md: 16px → -lg: 18px → -xl: 20px → -2xl: 24px → -3xl: 32px → -hero: clamp(2.5rem,5vw,4.5rem)
Z-index:   --kui-z-dropdown: 100, -sticky: 200, -overlay: 900, -modal: 1000, -toast: 1100, -tooltip: 1200
Easing:    --kui-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Role accent colors (hardcoded in component SCSS, not token-based)
```
chor: #e53e3e    police: #3182ce    daktar: #38a169    babu: #718096
```

---

## Component inventory

### Base components (src/components/base/)

| Component | Key props | Notes |
|-----------|-----------|-------|
| **KuiProvider** | `theme?`, `colorMode?`, `children` | Sets `data-kui-theme` + `data-kui-mode` on wrapper. Imports global styles. |
| **Avatar** | `initial`, `size?` (sm/md/lg/xl), `color?`, `isWinner?` | sm=26px md=34px lg=48px xl=64px. Winner glow keyframe. |
| **Badge** | `variant?` (default/night/day/voting/lobby/success/danger), `pulse?` | Phase-matching variants. |
| **Button** | `variant?` (primary/secondary/ghost), `size?` (sm/md/lg), `isLoading?`, `leftIcon?`, `rightIcon?`, `as?` | `forwardRef`. Polymorphic via `as`. |
| **Card** | `variant?` (default/secondary/ghost) | Compound: `Card.Header`, `Card.Body`, `Card.Footer`. |
| **Input** | `label?`, `error?` | `forwardRef`. aria-invalid + aria-describedby wired. |
| **Select** | `label?`, `error?`, `options` (required) | `forwardRef`. |
| **RoomCode** | `code`, `label?`, `size?` (sm/lg) | Display only. |
| **PlayerCard** | `name`, `initial`, `status?` (waiting/answered/locked/eliminated), `isMe?`, `color?`, `variant?` (grid/list) | Uses Avatar internally. |
| **ProgressBar** | `value` (0–100), `label?`, `showCount?`, `color?` | aria-valuenow/min/max. |
| **Timer** | `seconds`, `size?` (sm/md/lg), `color?` | `--urgent` class at ≤5s. role="timer". |
| **Leaderboard** | `players` (LeaderboardEntry[]), `maxShow?` | isMe highlighted, eliminated dimmed. |
| **Podium** | `winners` (exactly 3, rank 1/2/3) | Visual order: 2nd–1st–3rd. 1st gets lg Avatar. |
| **WinnerDisplay** | `winners` ({name, initial, score?}[]), `animated?` | Animated entrance. |
| **LoadingDot** | `message?`, `subtext?` | Default "Waiting…". |
| **TitleBlock** | `title`, `subtitle?`, `tagline?`, `watermark?` | Layered text treatment. |
| **PageBackground** | `variant?` (default/dark) | Full-page background layer. |
| **SettingsPanel** | `settings` ({key, value, isActive?}[]) | Key/value row list. |
| **ConfettiBurst** | `active`, `count?` (default 40) | Returns null when inactive. Parent needs `position: relative`. Seeded pseudo-random pieces (`Math.sin(seed)*10000`). CSS var `--r` per-piece rotation. |
| **CountdownSplash** | `count`, `visible` | Returns null when not visible. `key={count}` restarts animation on change. Fixed overlay, z-index 998, backdrop-filter blur. |
| **ToastStack** | `toasts` (ToastItem[]) | Fixed bottom-right, z-index 997. Reversed render (newest on top). Returns null when empty. |
| **PulseRing** | `active?`, `color?`, `children` | Wraps children with expanding ring. Color via inline `--kui-pulse-color` CSS var. `border-radius: inherit` follows child shape. |

### CPDB components (src/components/cpdb/)

| Component | Key props | Notes |
|-----------|-----------|-------|
| **RoleCard** | `role` (CpdbRole), `playerName`, `revealed?` | Pure CSS 3D flip (`transform-style: preserve-3d`, rotateY 180deg). Front: diagonal stripe + "?". Back: role color + emoji. Click handler from `...rest`. |
| **VoteTally** | `nominations` (VoteTallyEntry[]), `totalVoters` | Sorts desc by votes. Bar width = `votes/totalVoters * 100%`. Leading row gets `--leading` modifier. |
| **ActionPrompt** | `phase` (CpdbPhase), `role` (CpdbRole), `message`, `subtext?` | Phase emoji icon. 5px role-colored left border. |
| **PhaseTransition** | `phase`, `visible` | Fixed overlay, z-index 999. Opacity transition. Day phase uses dark text. aria-live="assertive". |
| **InvestigationResult** | `targetName`, `targetInitial`, `isChor`, `animated?` | Uses Avatar. Guilty="CHOR! 🔴" (red), Innocent="Innocent ✅" (green). Scale-in on animated. |
| **EliminationAnnouncement** | `playerName`, `playerInitial`, `role`, `animated?` | Greyscale Avatar (opacity 0.55, filter grayscale). Role-colored 5px left border. Slide-in from top. |

---

## Barrel exports

**src/index.ts** → `@khelahobe/kui`:
```ts
export { KuiProvider, Badge, Button, Input, Select, Card, Avatar, RoomCode, PlayerCard,
  ProgressBar, Timer, WinnerDisplay, Leaderboard, Podium, LoadingDot, SettingsPanel,
  TitleBlock, PageBackground, ConfettiBurst, CountdownSplash, ToastStack, PulseRing }
export type { KuiTheme, KuiColorMode, LeaderboardEntry, CpdbPlayer, CpdbInvestigation,
  CpdbRoleConfig, FpCategory, CpdbRole, CpdbPhase, VoteTallyEntry, ToastItem }
```

**src/cpdb.ts** → `@khelahobe/kui/cpdb`:
```ts
export { RoleCard, VoteTally, ActionPrompt, InvestigationResult, PhaseTransition, EliminationAnnouncement }
export type { CpdbRole, CpdbPhase, VoteTallyEntry }
```

---

## packages/docs — the showcase site

```
src/
  App.tsx          ← KuiProvider wrapper, theme/mode state, renders 8 zones
  sections/
    HeroSection.tsx, PrimitivesZone.tsx, DisplayZone.tsx, DataZone.tsx
    FeedbackZone.tsx, LayoutZone.tsx, CpdbZone.tsx, FunZone.tsx
  components/
    Booth.tsx        ← demo scaffold
    PropsTable.tsx   ← PropRow[] table
    CodeSnippet.tsx  ← syntax-highlighted code
    TopBar.tsx       ← nav, theme/mode toggles
  styles/docs.scss
```

### Booth component (ALL props required unless marked)

```ts
interface BoothProps {
  id:          string     // anchor link — REQUIRED, don't omit
  emoji:       string
  title:       string     // component name ("title" not "name")
  description: string
  snippet:     string     // raw code string shown in CodeSnippet
  props?:      PropRow[]  // optional; triggers collapsible props drawer
  children:    ReactNode  // live demo
}

interface PropRow {
  name: string; type: string; default?: string
  required?: boolean; description: string
}
```

### vite.config.ts aliases (resolve lib source during dev)

```ts
// IMPORTANT: subpath aliases must come BEFORE the base alias
'@khelahobe/kui/cpdb':       '../lib/src/cpdb.ts'
'@khelahobe/kui/fixedprice': '../lib/src/fixedprice.ts'
'@khelahobe/kui':            '../lib/src/index.ts'
```

---

## SCSS patterns

### BEM structure
```scss
.kui-button {
  &--primary { }    /* variant modifier */
  &--loading { }    /* state modifier */
  &__spinner { }    /* child element */
}
```

### Dark mode
```scss
.kui-invresult--guilty .kui-invresult__verdict {
  background: #fff5f5;
  [data-kui-mode="dark"] & { background: #2d1010; }
}
```

### Overlay z-index stack
- PhaseTransition: z-index 999 (fixed full-screen, pointer-events toggles with visible)
- CountdownSplash: z-index 998 (fixed full-screen, backdrop-filter blur)
- ToastStack:      z-index 997 (fixed bottom-right)

### CSS var override pattern (color props → CSS var → SCSS)
```tsx
// tsx: pass color via inline style
style={{ '--kui-pulse-color': color } as React.CSSProperties}
```
```scss
// scss: consume with fallback
border: 3px solid var(--kui-pulse-color, var(--kui-primary));
```

### Global animation keyframes (src/styles/animations.scss)
`kui-pulse`, `kui-winner-glow`, `kui-spin`, `kui-bounce-in`, `kui-fade-in`

Per-component keyframes live in each component's own `.scss` file:
`confetti-fall`, `countdown-pop`, `toast-in`, `pulse-ring`, `invresult-reveal`, `elimination-drop`, `phase-pulse`

---

## Common mistakes to avoid

1. **Missing `id` on Booth** — required, used for anchor navigation
2. **`name` instead of `title` on Booth** — the prop is `title`
3. **Alias order in vite.config.ts** — subpaths (`/cpdb`) must precede base (`@khelahobe/kui`)
4. **Scoping CSS vars to `:root`** — must always be `[data-kui-theme]`
5. **Forgetting lib rebuild** — `pnpm tsc --noEmit` in docs checks dist types; after source changes run `pnpm build` in `packages/lib`
6. **ConfettiBurst parent** — needs `position: relative` on parent to contain pieces
7. **RoleCard click** — handled via `...rest` spread, pass `onClick` directly as a prop
