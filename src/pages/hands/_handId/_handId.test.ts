import { CountAction, pointsReducer } from './components/inputs/AutomaticHandsCount'
import { objSum } from './helpers/helpers'

const initialState = {
  king: 0,
  queen: 0,
  knight: 0,
  jack: 0,
  oudler: 0,
  other: 0,
}
const oudlersCount: CountAction = { type: 'oudler', payload: 1 }
const kingsCount: CountAction = { type: 'king', payload: 2 }
const queensCount: CountAction = { type: 'queen', payload: 0 }
const knightsCount: CountAction = { type: 'knight', payload: 1 }
const jacksCount: CountAction = { type: 'jack', payload: 3 }
const otherCount: CountAction = { type: 'other', payload: 14 }

describe('Unit test - pointsReducer', () => {
  let state = initialState

  it('calculates the values of oudlers', () => {
    expect(pointsReducer(state, oudlersCount)).toEqual({
      ...state,
      oudler: 4.5,
    })
  })

  it('calculates the values of kings', () => {
    expect(pointsReducer(state, kingsCount)).toEqual({
      ...state,
      king: 9,
    })
  })
  it('calculates the values of queens', () => {
    expect(pointsReducer(state, queensCount)).toEqual({
      ...state,
      queen: 0,
    })
  })
  it('calculates the values of knights', () => {
    expect(pointsReducer(state, knightsCount)).toEqual({
      ...state,
      knight: 2.5,
    })
  })
  it('calculates the values of jacks', () => {
    expect(pointsReducer(state, jacksCount)).toEqual({
      ...state,
      jack: 4.5,
    })
  })
  it('calculates the values of the rest of the cards', () => {
    expect(pointsReducer(state, otherCount)).toEqual({
      ...state,
      other: 7,
    })
  })

  it('all adds up to the correct sum', () => {
    expect(objSum(state)).toBe(27.5)
  })
})
