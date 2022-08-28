import { Hand, Player } from '../../../../../types'
// cases from the official rules: http://www.fftarot.fr/assets/documents/R-RO201206.pdf

type TestGame = {
  players: Player[]
  hand: Hand
}

const caseOne: TestGame = {
  // Le preneur tente une Garde, présente une Poignée de 10 Atouts. Il mène le Petit
  // au Bout et réalise 49 points en détenant deux Bouts. Il passe donc de 49 - 41 = 8
  // o 25 (contrat) + 8 = 33 multiplié par 2 (Garde) = 66
  // o Poignée = 20
  // o Petit au Bout 10 X 2 = 20
  // Le nombre de points est égal à 66 + 20 + 20 = + 106
  // Chaque Défenseur marque -106 et le preneur marque 106 X 3 = +318.
  players: [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
  ],
  hand: {
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
  },
}

const caseTwo: TestGame = {
  // Le preneur gagne une Garde Sans de 4 points, mais le Petit est mené au Bout
  // par la Défense.
  // o (25 + 4 ) X 4 (Garde Sans) = 116
  // o Il faut retrancher 40 pour le Petit au Bout
  // Le nombre de points est égal à 116 – 40= + 76
  // Chaque Défenseur marque -76 et le preneur 76 X 3 = +228.
  players: [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
  ],
  hand: {
    taker: {
      playerId: '1',
      betName: 'gardeSans',
      oudlersCount: 2,
      pointsCount: 45,
    },
    defendeurs: ['2', '3', '4'],
    bonuses: [
      { name: 'poignee', playerID: '', type: '' },
      { name: 'petitAuBout', playerID: '2' },
      { name: 'chelem', playerID: '' },
    ],
  },
}

const caseThree: TestGame = {
  // Le preneur chute une Prise de 7 après avoir présenté une Poignée de 10 Atouts,
  // mais en menant le Petit au Bout.
  // (25 + 7 - 10 (Petit au Bout)) x 1 + 20 (Poignée)  = 42.
  // Chaque Défenseur marque + 42. Le preneur marque -42 X 3 = -126.
  players: [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
  ],
  hand: {
    taker: {
      playerId: '1',
      betName: 'petite',
      oudlersCount: 1,
      pointsCount: 51 - 7,
    },
    defendeurs: ['2', '3', '4'],
    bonuses: [
      { name: 'poignee', playerID: '1', type: 'simple' },
      { name: 'petitAuBout', playerID: '1' },
      { name: 'chelem', playerID: '' },
    ],
  },
}

const caseFour: TestGame = {
  // Sur une Garde, le preneur annonce et réussit le Chelem, montre une Poignée de
  // 10 Atouts et mène le Petit au Bout. La défense conserve l'Excuse qu'elle
  // possédait. Avec 2 Bouts, le preneur réalise 87 points. Il gagne de 87 - 41 = 46.
  // (46+25) X 2 (Garde) + 20 (Poignée) + 20 (Petit au Bout) + 400 (Chelem
  // annoncé) = +1746.
  players: [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
  ],
  hand: {
    taker: {
      playerId: '1',
      betName: 'garde',
      oudlersCount: 2,
      pointsCount: 87,
    },
    defendeurs: ['2', '3', '4'],
    bonuses: [
      { name: 'poignee', playerID: '1', type: 'simple' },
      { name: 'petitAuBout', playerID: '1' },
      { name: 'chelem', playerID: '1', announced: true, done: true },
    ],
  },
}

const caseFive: TestGame = {
  // Le preneur prend une petite, et appelle un partenaire, et gagne de 15
  // (25 + 15)
  players: [
    { id: '1', name: 'Andréa' },
    { id: '2', name: 'Fortunato' },
    { id: '3', name: 'Béatrice' },
    { id: '4', name: 'Alyx' },
    { id: '5', name: 'Ludo' },
  ],
  hand: {
    taker: {
      playerId: '1',
      partnerId: '2',
      betName: 'petite',
      oudlersCount: 3,
      pointsCount: 51,
    },
    defendeurs: ['3', '4', '5'],
    bonuses: [
      { name: 'poignee', playerID: '', type: '' },
      { name: 'petitAuBout', playerID: '' },
      { name: 'chelem', playerID: '', announced: true, done: true },
    ],
  },
}

export { caseOne, caseTwo, caseThree, caseFour, caseFive }
