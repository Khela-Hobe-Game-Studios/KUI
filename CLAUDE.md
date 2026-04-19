# @khelahobe/kui — Claude Context

## What this is
Khelahobe UI component library. Cartoon-pastel design system for games.
Two consumers: Chor Police Daktar Babu (CPDB) and Fixed Price.

## Repo structure
```
packages/lib   — the library (@khelahobe/kui)
packages/docs  — docs/showcase site (Vite React app)
```

## Rules
- ALL CSS classes prefixed `kui-`
- ALL CSS vars prefixed `--kui-` and scoped to `[data-kui-theme]` NOT `:root`
- Every component accepts `className?` and spreads `...rest`
- `forwardRef` on all input-like and button components
- TypeScript strict mode — no `any`
- Base components: zero game-specific logic
- Game components: purely presentational — no Firebase, no API calls

## Component locations
- `src/components/base/`       — generic (Button, Input, Card, Avatar, etc.)
- `src/components/game/cpdb/`  — CPDB-specific
- `src/components/game/fixedprice/` — Fixed Price specific

## Entry points
- `src/index.ts`      → base components
- `src/cpdb.ts`       → CPDB game components
- `src/fixedprice.ts` → Fixed Price game components

## CSS delivery
Consumer does `import '@khelahobe/kui/styles'` once.
KuiProvider writes `data-kui-theme="light|dark"` to wrapper div.
All theme tokens in `src/styles/tokens.scss`.

## Theme system
KuiProvider accepts `theme` (chor|police|daktar|default) and `colorMode` (light|dark).
Both light and dark keep pastel/cartoon colors — dark just has dark bg + surfaces.

## See SPEC.md for
- Complete CSS variable list
- All component TypeScript interfaces
- Z-index scale
- Animation tokens
