import { useFormikContext } from 'formik'
import { useContext, useEffect, useReducer } from 'react'
import { objSum } from '../../helpers/helpers'
import { HandContext } from '../../Index'

export type CardType = keyof typeof cardValues

export interface CountAction {
  type: CardType
  payload: number
}
export type StateType = {
  king: number
  queen: number
  knight: number
  jack: number
  oudler: number
  other: number
}

export type InputType = {
  name: CardType
  label: string
  max: number
}

const INPUTS: InputType[] = [
  {
    name: 'king',
    label: 'Entrez le nombre de rois',
    max: 4,
  },
  {
    name: 'queen',
    label: 'Entrez le nombre de reines',
    max: 4,
  },
  {
    name: 'knight',
    label: 'Entrez le nombre de cavaliers',
    max: 4,
  },
  {
    name: 'jack',
    label: 'Entrez le nombre de valets',
    max: 4,
  },
  {
    name: 'other',
    label: 'Entrez le nombre du reste des cartes',
    max: 62,
  },
]
export const cardValues = {
  oudler: 4.5,
  king: 4.5,
  queen: 3.5,
  knight: 2.5,
  jack: 1.5,
  other: 0.5,
} as const

export const pointsReducer = (state: StateType, { type, payload }: CountAction) => ({
  ...state,
  [type]: (state[type] = payload + cardValues[type]),
})

const AutomaticCount = () => {
  const { setFieldValue } = useFormikContext()
  const defaultHand = useContext(HandContext)
  const initialState = {
    king: 0,
    queen: 0,
    knight: 0,
    jack: 0,
    oudler: defaultHand?.taker?.oudlersCount || 0,
    other: 0,
  }
  const [total, dispatch] = useReducer(pointsReducer, initialState)

  useEffect(() => {
    const sum = objSum(total)
    setFieldValue('handCount', sum)
  }, [total, setFieldValue])

  return (
    <div>
      {INPUTS.map(({ name, label, max }) => (
        <div>
          <label>{label}</label>
          <input
            type="number"
            max={max}
            min={0}
            onChange={e => dispatch({ type: name, payload: parseInt(e.target.value) })}
          />
        </div>
      ))}
    </div>
  )
}

export default AutomaticCount
