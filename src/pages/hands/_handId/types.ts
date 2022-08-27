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
  oudler: 4.5,
  king: 4.5,
  queen: 3.5,
  knight: 2.5,
  jack: 1.5,
  other: 0.5,
} as const

export type InputType = {
  name: CardValuesKeys
  label: string
  max: number
}
