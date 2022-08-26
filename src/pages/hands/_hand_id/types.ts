export type CardValuesKeys = keyof typeof multipliers

export interface CountAction {
  type: CardValuesKeys
  payload: number
}
export type StateType = {
  king: number
  queen: number
  knight: number
  jack: number
  oudler: number
  other: number
}

export const multipliers = {
  oudler: 5,
  king: 5,
  queen: 4,
  knight: 3,
  jack: 2,
  other: 0.5,
} as const

export type InputType = {
  name: CardValuesKeys
  label: string
  max: number
}
