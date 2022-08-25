import { Field, Form, Formik } from 'formik'

import { Bonus, Hand, Player } from '../../../../types'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
  hands: Hand[]
  defaultHand: Hand | undefined
  players: Player[]
}

type MyInitialValues = {
  partner: string
  oudlers: number
  bonuses: Bonus[]
}

const AfterGame = ({ setStep, hands, defaultHand, players }: Props) => {
  const initialValues = {
    partner: '',
    oudlers: 0,
    bonuses: [],
  }

  const onSubmit = (values: MyInitialValues) => {
    console.log(values)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <div>
          {players.length === 5 && (
            <fieldset>
              <legend>Quel joueur a été appelé ?</legend>
              {players.map(({ name, id }) => (
                <div key={id}>
                  <label>
                    <Field type="radio" name="partner" value={id} />
                    {name}
                  </label>
                </div>
              ))}
            </fieldset>
          )}
        </div>

        <div></div>
        <button onClick={() => setStep('beforeGame')}>Retour</button>
        <button type="submit">Valider</button>
      </Form>
    </Formik>
  )
}
export default AfterGame
