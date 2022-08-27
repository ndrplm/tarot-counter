import { Form, Formik } from 'formik'

import BonusesInput from './inputs/BonusesInput'
import HandsCount from './inputs/HandsCountInput'
import OudlersInput from './inputs/OudlersInput'
import PartnerInput from './inputs/PartnerInput'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

type MyInitialValues = {
  partner: string
  oudlers: number
  bonuses: any // to replace
  handCount?: number
}

const AfterGame = ({ setStep }: Props) => {
  const initialValues = {
    partner: '',
    oudlers: 0,
    bonuses: {
      poignee: {
        checked: false,
        player: '',
      },
      chelem: {
        checked: false,
        player: '',
      },
      petit: {
        checked: false,
        player: '',
      },
    },
    handCount: 0,
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
