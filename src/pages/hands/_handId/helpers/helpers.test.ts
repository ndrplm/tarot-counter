import { Hand, Player } from '../../../../types'
import { calculateFinalScore, objSum, SumParam } from './helpers'

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

// Le preneur tente une Garde, présente une Poignée de 10 Atouts. Il mène le Petit
// au Bout et réalise 49 points en détenant deux Bouts. Il passe donc de 49 - 41 = 8
// o 25 (contrat) + 8 = 33 multiplié par 2 (Garde) = 66
// o Poignée = 20
// o Petit au Bout 10 X 2 = 20
// Le nombre de points est égal à 66 + 20 + 20 = + 106
// Chaque Défenseur marque -106 et le preneur marque 106 X 3 = +318.

describe('Unit test - calculareFinalScore', () => {
  const players: Player[] = [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
  ]
  const hand: Hand = {
    taker: {
      playerId: '1',
      betName: 'garde',
      oudlersCount: 2,
      pointsCount: 49,
    },
    defendeurs: ['2', '3', '4'],
    bonuses: [
      { name: 'poignee', playerID: '1', type: 'simple' },
      { name: 'petitAuBout', playerID: '1' },
      { name: 'chelem', playerID: '' },
    ],
  }
  it('works', () => {
    expect(calculateFinalScore(hand, players)).toEqual({ taker: 318, defendeurs: -106 })
  })
})
