import { Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PlayersContext } from '../../../../App'

import { Bet, Hand } from '../../../../types'
import { HandsContext } from '../../Context'
import { HandContext } from '../Index'

const BETS: Bet[] = [
  {
    name: 'petite',
    multiplier: 1,
  },
  {
    name: 'garde',
    multiplier: 2,
  },
  {
    name: 'garde sans',
    multiplier: 4,
  },
  {
    name: 'garde contre',
    multiplier: 6,
  },
]

type MyInitialValues = {
  taker: string
  bet: string
}

type Props = {
  setStep: React.Dispatch<React.SetStateAction<'beforeGame' | 'afterGame'>>
}

const BeforeGame = ({ setStep }: Props) => {
  const { id } = useParams()
  const [hand, setHand] = useContext(HandContext)
  const [hands] = useContext(HandsContext)
  const [players] = useContext(PlayersContext)

  console.log(hands)

  const initialValues: MyInitialValues = {
    taker: hand?.taker?.playerId || '',
    bet: hand?.taker?.betName || '',
  }

  const handleSubmit = ({ taker, bet }: MyInitialValues) => {
    const updatedHandIndex = hands.findIndex((hand: Hand) => hand.id === id)
    hands[updatedHandIndex] = {
      ...hand,
      taker: {
        playerId: taker,
        betName: bet,
      },
    }
    console.log(updatedHandIndex)
    console.log('curenthand: ', hands[updatedHandIndex])
    sessionStorage.setItem('hands', JSON.stringify(hands))
    // I don't get why this can be undefined
    setHand?.({
      ...hand,
      taker: {
        playerId: taker,
        betName: bet,
      },
    })
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
                <Field type="radio" name="taker" value={id} />
                {name}
              </label>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Quelle est son enchère</legend>
          {BETS.map(({ name }) => (
            <div key={name}>
              <label>
                <Field type="radio" name="bet" value={name} />
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
