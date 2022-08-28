import { calculateFinalScore } from './calculateFinalScore'
import { caseOne, caseThree, caseTwo, caseFour, caseFive } from './mocks/mocks'

describe('Unit test - calculateFinalScore', () => {
  it('returns the right value for caseOne', () => {
    const { players, hand } = caseOne
    expect(calculateFinalScore(hand, players)).toEqual({ taker: 318, defendeurs: -106 })
  })
  it('returns the right value for caseTwo', () => {
    const { players, hand } = caseTwo
    expect(calculateFinalScore(hand, players)).toEqual({ taker: 228, defendeurs: -76 })
  })
  it('returns the right value for casetThree', () => {
    const { players, hand } = caseThree
    expect(calculateFinalScore(hand, players)).toEqual({ taker: -126, defendeurs: 42 })
  })
  it('returns the right value for caseFour', () => {
    const { players, hand } = caseFour
    expect(calculateFinalScore(hand, players)).toEqual({ taker: 1746, defendeurs: -582 })
  })
  it('returns the right value for caseFive', () => {
    const { players, hand } = caseFive
    expect(calculateFinalScore(hand, players)).toEqual({ taker: 80, defendeurs: -40, partner: 40 })
  })
})
