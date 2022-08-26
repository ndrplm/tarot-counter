import { objSum } from './helpers'

// tester si en passant dans le dispatcher, j'ai bien les bons totaux.
// pour l'instant ça marche pas :'(
describe('Unit test - pointsReducer', () => {
  it('returns the right result', () => {
    const total = {
      king: 1, // 5
      queen: 2, // 8
      jack: 3, // 6
      knight: 4, // 12
      oudler: 1, // 5
      other: 11, //
    }
    expect(sumOfCards(total)).toBe(32)
  })
})
