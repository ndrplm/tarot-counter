import { useFormikContext } from 'formik'
import { useContext, useEffect, useReducer } from 'react'
import { pointsReducer } from '../../helpers/helpers'
import { HandContext } from '../../Index'
import { InputType } from '../../types'

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
    const values = Object.values(total)
    const sum = values.reduce((acc, val) => acc + val)
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
