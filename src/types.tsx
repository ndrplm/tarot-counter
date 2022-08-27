export interface Player {
  name: string
  id: string
}

export interface Game {
  players: Player[]
  hands?: Hand[]
}

export type ID = string

export interface Hand {
  id?: string
  taker?: Taker
  defendeurs?: ID[]
  bonuses?: Bonus[]
}

export interface Taker {
  playerId?: string
  partnerId?: string
  betName?: string
  oudlersCount?: number
  pointsCount?: number
}

export interface Bonus {
  name?: 'chelem' | 'poignee' | 'petitAuBout'
  playersID?: ID[]
}
