import { CountAction, multipliers, StateType } from '../types'

export const pointsReducer = (state: StateType, { type, payload }: CountAction) => ({
  ...state,
  [type]: (state[type] = payload + multipliers[type]),
})

type SumParam = {
  [index: string]: number
}

export function objSum(obj: SumParam) {
  const values = Object.values(obj)
  return values.reduce((acc, val) => acc + val)
}
