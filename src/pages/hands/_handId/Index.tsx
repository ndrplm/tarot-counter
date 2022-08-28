import { createContext, useContext, useState } from 'react'
import AfterGame from './components/AfterGame'
import BeforeGame from './components/BeforeGame'
import { Hand } from '../../../types'
import { useParams } from 'react-router-dom'
import { HandsContext } from '../Context'

const STEPS = {
  beforeGame: BeforeGame,
  afterGame: AfterGame,
}
export type StepsKey = keyof typeof STEPS
type ContextTuple = [hand: Hand, setHand: React.Dispatch<React.SetStateAction<Hand>>]

export const HandContext = createContext<ContextTuple>([{}, () => {}])

const Index = () => {
  const { id } = useParams()
  const [hands] = useContext(HandsContext)
  const [hand, setHand] = useState(hands.find((hand: Hand) => hand.id === id) || {})
  const [step, setStep] = useState<StepsKey>('beforeGame')
  const CurrentStep = STEPS[step]

  return (
    <HandContext.Provider value={[hand, setHand]}>
      <CurrentStep setStep={setStep} />
    </HandContext.Provider>
  )
}

export default Index
