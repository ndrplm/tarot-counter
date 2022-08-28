import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PlayersContext } from '../../../../App'
import { Bonus, Hand, ID, Player } from '../../../../types'
import { HandsContext } from '../../Context'
import { HandContext } from '../Index'

export type SumParam = {
  [index: string]: number
}

export function objSum(obj: SumParam) {
  const values = Object.values(obj)
  return values.reduce((acc, val) => acc + val)
}

export function useUpdateHand() {
  const [hands, setHands] = useContext(HandsContext)
  const [, setHand] = useContext(HandContext)
  const { id } = useParams()

  return (updatedHand: Hand) => {
    let handsCopy = [...hands]
    const updatedHandIndex = hands.findIndex((hand: Hand) => hand.id === id)
    handsCopy[updatedHandIndex] = updatedHand
    sessionStorage.setItem('hands', JSON.stringify(handsCopy))
    setHands(handsCopy)
    setHand(updatedHand)
  }
}

const BASE_POINTS = 25

type ExpectedPointsType = {
  [index: number]: number
}

const EXPECTED_POINTS: ExpectedPointsType = {
  0: 56,
  1: 51,
  2: 41,
  3: 36,
}

type BetMultiplierType = {
  [index: string]: 1 | 2 | 4 | 6
}

const BETS_MULTIPLIERS: BetMultiplierType = {
  petite: 1,
  garde: 2,
  gardeSans: 4,
  gardeContre: 6,
}

const POIGNEE_VALUES = {
  '': 0,
  simple: 20,
  double: 30,
  triple: 40,
} as const

const PETIT_AU_BOUT_VALUE = 10

// Calcul points final
// Score = (25 + Extra points + Petit au bout) X Contrat + Poignée + Chelem

const calculateChelemValue = ({ done, announced }: Bonus): -200 | 0 | 200 | 400 => {
  if (announced) {
    if (done) return 400
    return -200
  }
  if (done) return 200
  return 0
}

type WinnerType = 'taker' | 'defense'

const calculatePetitAuBoutValue = (
  petitAuBout: Bonus,
  defendeurs: ID[],
  winningSide: WinnerType,
) => {
  const petitAuBoutValue = petitAuBout.playerID ? PETIT_AU_BOUT_VALUE : 0
  const petitAuBoutOwner = defendeurs.includes(petitAuBout.playerID) ? 'defense' : 'taker'
  if (petitAuBoutOwner === winningSide) return petitAuBoutValue
  return -petitAuBoutValue
}

const calculateTakerScore = ({
  playersLength,
  baseScore,
  hasWon,
}: {
  playersLength: number
  baseScore: number
  hasWon: boolean
}) => {
  const multiplier = playersLength === 5 ? playersLength - 2 : playersLength - 1
  const score = baseScore * multiplier
  if (playersLength === 5) {
    const takerShare = (score / 3) * 2
    const partnerShare = score / 3
    return {
      taker: hasWon ? takerShare : -takerShare,
      partner: hasWon ? partnerShare : -partnerShare,
    }
  }
  return { taker: hasWon ? score : -score }
}

const calculateDefenseScore = ({ baseScore, hasWon }: { baseScore: number; hasWon: boolean }) => {
  return {
    defendeurs: hasWon ? baseScore : -baseScore,
  }
}

// Sorry for the ! here. I should pass defaut taker value to avoid this check here
export function calculateFinalScore(hand: Hand, players: Player[]) {
  const {
    taker: { oudlersCount, pointsCount, betName } = {},
    defendeurs = [],
    bonuses: [poignee, petitAuBout, chelem] = [],
  } = hand

  const diff = pointsCount! - EXPECTED_POINTS[oudlersCount!]
  const winningSide = diff >= 0 ? 'taker' : 'defense'
  const absoluteDiff = Math.ceil(Math.abs(diff))
  const petitAuBoutValue = calculatePetitAuBoutValue(petitAuBout, defendeurs, winningSide)
  const betMultiplier = BETS_MULTIPLIERS[betName!]
  const poigneeValue = poignee.playerID ? POIGNEE_VALUES[poignee.type!] : 0
  const chelemValue = chelem.playerID ? calculateChelemValue(chelem) : 0

  const score =
    (BASE_POINTS + absoluteDiff + petitAuBoutValue) * betMultiplier + poigneeValue + chelemValue

  const defenderScore = calculateDefenseScore({
    baseScore: score,
    hasWon: winningSide === 'defense',
  })
  const takerScore = calculateTakerScore({
    playersLength: players.length,
    baseScore: score,
    hasWon: winningSide === 'taker',
  })

  return {
    ...takerScore,
    ...defenderScore,
  }
}
