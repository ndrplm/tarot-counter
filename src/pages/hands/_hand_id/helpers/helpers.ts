import { CountAction, multipliers, StateType } from '../types'

export const pointsReducer = (state: StateType, { type, payload }: CountAction) => ({
  ...state,
  [type]: (state[type] = payload * multipliers[type]),
})
