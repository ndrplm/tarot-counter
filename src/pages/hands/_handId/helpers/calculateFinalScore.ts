import {
  BASE_POINTS,
  BETS_MULTIPLIERS,
  EXPECTED_POINTS,
  PETIT_AU_BOUT_VALUE,
  POIGNEE_VALUES,
} from '../../../../tarotRules'
import { Bonus, Hand, ID, Player } from '../../../../types'

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

type CalculateTakerScoreParams = {
  playersLength: number
  baseScore: number
  hasWon: boolean
}
const calculateTakerScore = ({ playersLength, baseScore, hasWon }: CalculateTakerScoreParams) => {
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

type CalculateDefenseScoreParams = { baseScore: number; hasWon: boolean }
const calculateDefenseScore = ({ baseScore, hasWon }: CalculateDefenseScoreParams) => {
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
