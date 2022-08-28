import { SumParam, objSum } from './utils'

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
