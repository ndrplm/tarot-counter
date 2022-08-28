import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { HandsContext } from '../../../../App'

import { Hand } from '../../../../types'
import { HandContext } from '../Index'

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
