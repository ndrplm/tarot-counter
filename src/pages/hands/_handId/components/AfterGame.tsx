import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { Bonus, Taker } from '../../../../types'
import { useUpdateHand } from '../helpers/helpers'
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
}

const AfterGame = ({ setStep }: Props) => {
  const [hand] = useContext(HandContext)
  const updateHand = useUpdateHand()

  const initialValues: AfterGameInitialValues = {
    taker: {
      partnerId: hand?.taker?.partnerId || '',
      oudlersCount: hand?.taker?.oudlersCount || 0,
      pointsCount: hand?.taker?.pointsCount || 0,
    },
    bonuses: [
      {
        name: 'poignee',
        checked:
          hand?.bonuses?.some(bonus => bonus.name === 'poignee' && bonus.playersID.length > 0) ||
          false,
        playersID: hand?.bonuses?.find(bonus => bonus.name === 'poignee')?.playersID || [],
      },
      {
        name: 'chelem',
        checked:
          hand?.bonuses?.some(bonus => bonus.name === 'chelem' && bonus.playersID.length > 0) ||
          false,
        playersID: hand?.bonuses?.find(bonus => bonus.name === 'chelem')?.playersID || [],
      },
      {
        name: 'petitAuBout',
        checked:
          hand?.bonuses?.some(
            bonus => bonus.name === 'petitAuBout' && bonus.playersID.length > 0,
          ) || false,
        playersID: hand?.bonuses?.find(bonus => bonus.name === 'petitAuBout')?.playersID || [],
      },
    ],
  }

  const onSubmit = ({ taker, bonuses }: AfterGameInitialValues) => {
    const updatedHand = { ...hand, taker: { ...hand.taker, ...taker }, bonuses }
    updateHand(updatedHand)
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
