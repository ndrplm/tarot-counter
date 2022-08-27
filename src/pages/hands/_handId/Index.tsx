import { createContext, useContext, useState } from 'react'
import AfterGame from './components/AfterGame'
import BeforeGame from './components/BeforeGame'
import { Hand } from '../../../types'
import { useParams } from 'react-router-dom'
import { HandsContext } from '../Index'

const STEPS = {
  beforeGame: BeforeGame,
  afterGame: AfterGame,
}
export type StepsKey = keyof typeof STEPS

export const HandContext = createContext<Hand | undefined>({})

const Index = () => {
  const { id } = useParams()
  const hands: Hand[] = useContext(HandsContext)

  const [step, setStep] = useState<StepsKey>('beforeGame')
  const CurrentStep = STEPS[step]
  const defaultHand: Hand | undefined = hands.find((hand: Hand) => hand.id === id)

  return (
    <HandContext.Provider value={defaultHand}>
      <CurrentStep setStep={setStep} defaultHand={defaultHand} />)
    </HandContext.Provider>
  )
}

export default Index
