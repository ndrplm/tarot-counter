import { Field, useFormikContext } from 'formik'
import { useContext } from 'react'
import { PlayersContext } from '../../../../../App'
import { ID } from '../../../../../types'
import { AfterGameInitialValues } from '../AfterGame'

const PartnerInput = () => {
  const [players] = useContext(PlayersContext)
  const { setFieldValue, values } = useFormikContext<AfterGameInitialValues>()
  const handleChange = (id: ID) => {
    setFieldValue('taker.partnerId', id)
    const updatedDefendeurs = values.defendeurs.filter((defendeur: ID) => defendeur !== id)
    setFieldValue('defendeurs', updatedDefendeurs)
  }
  return (
    <div>
      {players.length === 5 && (
        <fieldset>
          <legend>Quel joueur a été appelé ?</legend>
          {players.map(({ name, id }) => (
            <div key={id}>
              <label>
                <Field
                  type="radio"
                  name="taker.partnerId"
                  value={id}
                  onChange={() => handleChange(id)}
                />
                {name}
              </label>
            </div>
          ))}
        </fieldset>
      )}
    </div>
  )
}

export default PartnerInput
