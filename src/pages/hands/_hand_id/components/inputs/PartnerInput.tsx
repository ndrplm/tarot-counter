import { Field } from 'formik'
import { useContext } from 'react'
import { PlayersContext } from '../../../../../App'

const PartnerInput = () => {
  const players = useContext(PlayersContext)
  return (
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
  )
}

export default PartnerInput
