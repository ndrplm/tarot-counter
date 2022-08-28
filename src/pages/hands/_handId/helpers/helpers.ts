import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Hand } from '../../../../types'
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
