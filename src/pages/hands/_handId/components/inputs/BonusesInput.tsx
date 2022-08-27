import { Field, FieldArray, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import { PlayersContext } from '../../../../../App'

import { Player } from '../../../../../types'
import { AfterGameInitialValues } from '../AfterGame'

// const BONUSES = ['chelem', 'poignee', 'petit'] as const

// TODO to rework

const BonusesInput = () => {
  const [players] = useContext(PlayersContext)
  const { values, setFieldValue } = useFormikContext<AfterGameInitialValues>()
  return (
    <FieldArray name="bonuses">
      {() => (
        <>
          <label>Quelles sont les primes réalisées ?</label>
          {values.bonuses.map(({ name }) => {
            const bonusIndex = values.bonuses.findIndex(bonus => bonus.name === name)
            return (
              <div key={name}>
                <>
                  <Field type="checkbox" name={`bonuses[${bonusIndex}].checked`} />
                  {name}
                  <Field
                    as="select"
                    multiple
                    name={`bonuses[${bonusIndex}].playersID`}
                    onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue(
                        `bonuses[${bonusIndex}].playersID`,
                        [].slice
                          .call(evt.target.selectedOptions)
                          .map((option: HTMLOptionElement) => option.value),
                      )
                    }
                  >
                    {players.map((player: Player) => (
                      <option value={player.id}>{player.name}</option>
                    ))}
                  </Field>
                </>
              </div>
            )
          })}
        </>
      )}
    </FieldArray>
  )
}

export default BonusesInput
