import { useState } from 'react'
import AfterGame from './components/AfterGame'
import BeforeGame from './components/BeforeGame'
import { Hand, Player } from './../../../types'
import { useParams } from 'react-router-dom'

const STEPS = {
  beforeGame: BeforeGame,
  afterGame: AfterGame,
}
export type StepsKey = keyof typeof STEPS

const Index = () => {
  const { id } = useParams()

  const [step, setStep] = useState<StepsKey>('beforeGame')
  const CurrentStep = STEPS[step]
  const hands: Hand[] = JSON.parse(sessionStorage.hands || null)
  const defaultHand: Hand | undefined = hands.find((hand: Hand) => hand.id === id)
  const players: Player[] = JSON.parse(sessionStorage.players)

  return <CurrentStep setStep={setStep} hands={hands} defaultHand={defaultHand} players={players} />
}

export default Index
