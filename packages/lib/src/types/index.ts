// ─── Shared game types ────────────────────────────────────────────────────────

export type KuiTheme     = 'default' | 'chor' | 'police' | 'daktar' | 'fixedprice'
export type KuiColorMode = 'light' | 'dark'
export type CpdbRole     = 'chor' | 'police' | 'daktar' | 'babu'
export type CpdbPhase    = 'lobby' | 'night' | 'day' | 'voting' | 'results'

export interface VoteTallyEntry {
  playerId:   string
  name:       string
  initial:    string
  votes:      number
  isLeading?: boolean
}

export interface ToastItem {
  id:      string
  message: string
  type?:   'info' | 'success' | 'danger'
  emoji?:  string
}

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
