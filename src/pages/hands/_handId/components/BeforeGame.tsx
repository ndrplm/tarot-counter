import { Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PlayersContext } from '../../../../App'

import { Hand, Taker } from '../../../../types'
import { HandsContext } from '../../Context'
import { HandContext } from '../Index'

const BETS = ['petite', 'garde', 'gardeSans', 'gardeContre'] as const

type MyInitialValues = {
  taker: Taker
}

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

const BeforeGame = ({ setStep }: Props) => {
  const { id } = useParams()
  const [hand, setHand] = useContext(HandContext)
  const [hands] = useContext(HandsContext)
  const [players] = useContext(PlayersContext)

  const initialValues: MyInitialValues = {
    taker: {
      playerId: hand?.taker?.playerId || '',
      betName: hand?.taker?.betName || '',
    },
  }

  const handleSubmit = ({ taker }: MyInitialValues) => {
    const updatedHandIndex = hands.findIndex((hand: Hand) => hand.id === id)
    const updatedHand: Hand = {
      ...hand,
      taker: { ...taker },
      defendeurs: players.filter(player => player.id !== taker.playerId).map(player => player.id),
    }
    hands[updatedHandIndex] = updatedHand
    sessionStorage.setItem('hands', JSON.stringify(hands))
    // I don't get why this can be undefined
    setHand?.(updatedHand)
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
