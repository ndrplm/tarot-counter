import { Field, FieldArray } from 'formik'
import { useContext } from 'react'
import { PlayersContext } from '../../../../../App'

import { Player } from '../../../../../types'

const BONUSES = ['chelem', 'poignee', 'petit'] as const

const BonusesInput = () => {
  const players = useContext(PlayersContext)
  return (
    <FieldArray name="bonuses">
      {() => (
        <>
          <label>Quelles sont les primes réalisées ?</label>
          {BONUSES.map(bonus => (
            <div>
              <Field type="checkbox" name={`bonuses[${bonus}].checked`} />
              {bonus}
              <Field as="select" name={`bonuses[${bonus}].player`}>
                {players.map((player: Player) => (
                  <option value={player.id}>{player.name}</option>
                ))}
              </Field>
            </div>
          ))}
        </>
      )}
    </FieldArray>
  )
}

export default BonusesInput
