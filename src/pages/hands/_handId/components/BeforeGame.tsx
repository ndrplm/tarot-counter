import { Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import { PlayersContext } from '../../../../App'

import { Hand, Taker } from '../../../../types'
import { useUpdateHand } from '../helpers/helpers'
import { HandContext } from '../Index'

const BETS = ['petite', 'garde', 'gardeSans', 'gardeContre'] as const

type MyInitialValues = {
  taker: Taker
}

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

const BeforeGame = ({ setStep }: Props) => {
  const [hand] = useContext(HandContext)
  const [players] = useContext(PlayersContext)
  const updateHand = useUpdateHand()

  const initialValues: MyInitialValues = {
    taker: {
      playerId: hand?.taker?.playerId || '',
      betName: hand?.taker?.betName || '',
    },
  }

  const handleSubmit = ({ taker }: MyInitialValues) => {
    const updatedHand: Hand = {
      ...hand,
      taker: { ...taker },
      defendeurs: players.filter(player => player.id !== taker.playerId).map(player => player.id),
    }
    updateHand(updatedHand)
    setStep('afterGame')
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <fieldset>
          <legend>Quel joueur a pris</legend>
          {players.map(({ name, id }) => (
            <div key={id}>
              <label>
                <Field type="radio" name="taker.playerId" value={id} />
                {name}
              </label>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Quelle est son enchère</legend>
          {BETS.map(name => (
            <div key={name}>
              <label>
                <Field type="radio" name="taker.betName" value={name} />
                {name}
              </label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default BeforeGame
