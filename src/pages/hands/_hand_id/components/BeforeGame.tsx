import { Field, Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'

import { Bet, Hand, Player } from '../../../../types'

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
  hands: Hand[]
  defaultHand: Hand | undefined
  players: Player[]
}

const BeforeGame = ({ setStep, hands, defaultHand, players }: Props) => {
  const { id } = useParams()

  const initialValues: MyInitialValues = {
    taker: defaultHand?.taker?.playerId || '',
    bet: defaultHand?.taker?.betName || '',
  }

  const handleSubmit = ({ taker, bet }: MyInitialValues) => {
    const updatedHandIndex = hands.findIndex((hand: Hand) => hand.id === id)
    hands[updatedHandIndex] = {
      ...defaultHand,
      taker: {
        playerId: taker,
        betName: bet,
      },
    }
    sessionStorage.setItem('hands', JSON.stringify(hands))
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
