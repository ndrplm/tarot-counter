import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayersContext } from '../../../../App'
import { Bonus, ID, Taker } from '../../../../types'
import { calculateFinalScore } from '../helpers/calculateFinalScore'
import { useUpdateHand } from '../helpers/useUpdateHand'
import { HandContext } from '../Index'

import BonusesInput from './inputs/BonusesInput'
import HandsCount from './inputs/HandsCountInput'
import OudlersInput from './inputs/OudlersInput'
import PartnerInput from './inputs/PartnerInput'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

type FormikBonusType = Bonus & { checked: boolean }

export type AfterGameInitialValues = {
  taker: Taker
  bonuses: FormikBonusType[]
  defendeurs: ID[]
}

const AfterGame = ({ setStep }: Props) => {
  const [hand] = useContext(HandContext)
  const [players] = useContext(PlayersContext)
  const updateHand = useUpdateHand()
  const navigate = useNavigate()

  const findBonus = (bonusName: string) => hand?.bonuses?.find(bonus => bonus.name === bonusName)

  const initialValues: AfterGameInitialValues = {
    taker: {
      partnerId: hand?.taker?.partnerId || '',
      oudlersCount: hand?.taker?.oudlersCount || 0,
      pointsCount: hand?.taker?.pointsCount || 0,
    },
    bonuses: [
      {
        name: 'poignee',
        type: findBonus('poignee')?.type || '',
        checked: hand?.bonuses?.some(bonus => bonus.name === 'poignee' && bonus.playerID) || false,
        playerID: findBonus('poignee')?.playerID || '',
      },

      {
        name: 'petitAuBout',
        checked:
          hand?.bonuses?.some(bonus => bonus.name === 'petitAuBout' && bonus.playerID) || false,
        playerID: findBonus('petitAuBout')?.playerID || '',
      },
      {
        name: 'chelem',
        checked: hand?.bonuses?.some(bonus => bonus.name === 'chelem' && bonus.playerID) || false,
        playerID: findBonus('chelem')?.playerID || '',
        done: findBonus('chelem')?.done || false,
        announced: findBonus('chelem')?.announced || false,
      },
    ],
    defendeurs: hand.defendeurs || [],
  }

  const onSubmit = ({ taker, bonuses, defendeurs }: AfterGameInitialValues) => {
    const updatedHand = { ...hand, taker: { ...hand.taker, ...taker }, bonuses, defendeurs }
    const score = calculateFinalScore(updatedHand, players)
    updateHand({ ...updatedHand, score })
    navigate(`/score?handId=${hand.id}`)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <PartnerInput />
        <OudlersInput />
        <BonusesInput />
        <HandsCount />
        <div>
          <button onClick={() => setStep('beforeGame')}>Retour</button>
          <button type="submit">Valider</button>
        </div>
      </Form>
    </Formik>
  )
}
export default AfterGame
