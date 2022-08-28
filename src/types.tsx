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
  score?: { taker: number; defendeurs: number; partner?: number }
}

export interface Taker {
  playerId?: string
  partnerId?: string
  betName?: '' | 'petite' | 'garde' | 'gardeSans' | 'gardeContre'
  oudlersCount?: number
  pointsCount?: number
}

export interface Bonus {
  name: 'chelem' | 'poignee' | 'petitAuBout'
  playerID: ID
  // this could have been achieved with extends but I struggled with the implementation
  type?: '' | 'simple' | 'double' | 'triple'
  done?: boolean
  announced?: boolean
}
