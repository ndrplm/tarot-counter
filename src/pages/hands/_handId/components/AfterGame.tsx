import { Form, Formik } from 'formik'
import { Bonus, Taker } from '../../../../types'

import BonusesInput from './inputs/BonusesInput'
import HandsCount from './inputs/HandsCountInput'
import OudlersInput from './inputs/OudlersInput'
import PartnerInput from './inputs/PartnerInput'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

type FormikBonusType = Bonus & { checked: boolean }

type MyInitialValues = {
  taker: Taker
  bonuses: FormikBonusType[]
}

const AfterGame = ({ setStep }: Props) => {
  const initialValues: MyInitialValues = {
    taker: {
      partnerId: '',
      oudlersCount: 0,
      pointsCount: 0,
    },
    bonuses: [
      {
        name: 'poignee',
        checked: false,
        players: [],
      },
      {
        name: 'chelem',
        checked: false,
        players: [],
      },
      {
        name: 'petitAuBout',
        checked: false,
        players: [],
      },
    ],
  }

  const onSubmit = (values: MyInitialValues) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <PartnerInput />
        <OudlersInput />
        <BonusesInput />
        <HandsCount />
        <button onClick={() => setStep('beforeGame')}>Retour</button>
        <button type="submit">Valider</button>
      </Form>
    </Formik>
  )
}
export default AfterGame
