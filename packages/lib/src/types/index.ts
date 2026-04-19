// ─── Shared game types ────────────────────────────────────────────────────────

export type KuiTheme     = 'default' | 'chor' | 'police' | 'daktar'
export type KuiColorMode = 'light' | 'dark'

// CPDB
export interface CpdbPlayer {
  id:     string
  name:   string
  alive?: boolean
  role?:  string
}

export interface CpdbInvestigation {
  policeId: string
  targetId: string
  isChor:   boolean
}

export interface CpdbRoleConfig {
  chor:   number
  daktar: number
  police: number
  babu:   number
}

// Leaderboard (shared between both games)
export interface LeaderboardEntry {
  id:          string
  rank:        number
  name:        string
  initial:     string
  score:       number
  isMe?:       boolean
  eliminated?: boolean
}

// FixedPrice
export type FpCategory = 'desh' | 'cricket' | 'taka' | 'global' | 'weird'
