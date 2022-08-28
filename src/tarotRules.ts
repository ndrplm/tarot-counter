export const POIGNEE_VALUES = {
  '': 0,
  simple: 20,
  double: 30,
  triple: 40,
} as const

type BetMultiplierType = {
  [index: string]: 1 | 2 | 4 | 6
}
export const BETS_MULTIPLIERS: BetMultiplierType = {
  petite: 1,
  garde: 2,
  gardeSans: 4,
  gardeContre: 6,
}

export const PETIT_AU_BOUT_VALUE = 10
export const BASE_POINTS = 25

type ExpectedPointsType = {
  [index: number]: number
}

export const EXPECTED_POINTS: ExpectedPointsType = {
  0: 56,
  1: 51,
  2: 41,
  3: 36,
}
