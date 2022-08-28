import { calculateFinalScore, objSum, SumParam } from './helpers'
import { caseOne, caseThree, caseTwo, caseFour, caseFive } from './mocks'

const positiveValues: SumParam = {
  key1: 1,
  key2: 3,
  key3: 5,
}

const negativeValues: SumParam = {
  key4: -10,
  key5: 3,
  key6: -5,
}

const floatValues: SumParam = {
  key7: 1.12,
  key8: 4.65,
  key9: 8.77,
}

describe('Unit test - objSum', () => {
  it("returns the sum of an object's values - positive values", () => {
    expect(objSum(positiveValues)).toBe(9)
  })
  it("returns the sum of an object's values - negative values", () => {
    expect(objSum(negativeValues)).toBe(-12)
  })
  it("returns the sum of an object's values - float values", () => {
    expect(objSum(floatValues)).toBe(14.54)
  })

  it("returns the sum of an object's values - all of the above", () => {
    expect(objSum({ ...positiveValues, ...negativeValues, ...floatValues })).toBe(11.54)
  })
})

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
