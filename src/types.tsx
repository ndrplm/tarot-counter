export interface Player {
  name: string
  id: string
}

export interface Game {
  players: Player[]
  hands?: Hand[]
}

export interface Hand {
  id?: string
  taker?: Taker
  defense?: Defense
}

export interface Defense {
  players: Player[]
  bonuses: Bonus[]
  score: number
}

export interface Taker {
  playerId?: string
  partnerId?: string
  betName?: string
  oudlersCount?: number
  pointsCount?: number
  bonuses?: Bonus[]
  score?: number
}

export interface Bonus {
  name: 'chelem' | 'poignée' | 'petit au bout'
  points: number
  isMultiplied: boolean
}

export interface Bet {
  name: 'petite' | 'garde' | 'garde sans' | 'garde contre'
  multiplier: number
}
