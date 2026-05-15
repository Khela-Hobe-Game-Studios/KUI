# @khelahobe/kui

Khelahobe UI — cartoon-pastel React component library for games by Khela Hobe Game Studios.

## Install

```bash
npm install @khelahobe/kui
```

## Quick start

```tsx
import { KuiProvider, Button } from '@khelahobe/kui'
import '@khelahobe/kui/styles'

export default function App() {
  return (
    <KuiProvider theme="default" colorMode="light">
      <Button variant="primary">Play</Button>
    </KuiProvider>
  )
}
```

## Subpaths

- `@khelahobe/kui` — base components (Button, Card, Avatar, Leaderboard, Podium, …)
- `@khelahobe/kui/cpdb` — Chor Police Daktar Babu game components
- `@khelahobe/kui/fixedprice` — Fixed Price (এক দাম) game components
- `@khelahobe/kui/styles` — compiled CSS bundle (import once at app root)

## Themes

Built-in: `default | chor | police | daktar | fixedprice`. Each pairs with `colorMode: 'light' | 'dark'`.

## Docs

See the live showcase at the project's GitHub Pages site, or `SPEC.md` for the authoritative component interface contract.
