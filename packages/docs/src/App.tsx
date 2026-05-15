import { useState } from 'react'
import { KuiProvider } from '@khelahobe/kui'
import type { KuiTheme, KuiColorMode } from '@khelahobe/kui'
import { TopBar } from './components/TopBar'
import { HeroSection } from './sections/HeroSection'
import { PrimitivesZone } from './sections/PrimitivesZone'
import { DisplayZone } from './sections/DisplayZone'
import { DataZone } from './sections/DataZone'
import { FeedbackZone } from './sections/FeedbackZone'
import { LayoutZone } from './sections/LayoutZone'
import { CpdbZone }   from './sections/CpdbZone'
import { FixedPriceZone } from './sections/FixedPriceZone'
import { FunZone }    from './sections/FunZone'
import './styles/docs.scss'

export default function App() {
  const [theme, setTheme] = useState<KuiTheme>('default')
  const [colorMode, setColorMode] = useState<KuiColorMode>('light')

  return (
    <KuiProvider theme={theme} colorMode={colorMode}>
      <TopBar
        theme={theme}
        onThemeChange={setTheme}
        colorMode={colorMode}
        onColorModeChange={setColorMode}
      />
      <main className="docs-main">
        <HeroSection />
        <PrimitivesZone />
        <DisplayZone />
        <DataZone />
        <FeedbackZone />
        <LayoutZone />
        <CpdbZone />
        <FixedPriceZone />
        <FunZone />
      </main>
    </KuiProvider>
  )
}
