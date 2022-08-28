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
  // reset the players field when the checkbox is unchecked
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, bonusIndex: number) => {
    setFieldValue(`bonuses[${bonusIndex}].checked`, e.target.checked)
    if (!e.target.checked) setFieldValue(`bonuses[${bonusIndex}].playersID`, [])
  }

  // Handle multi select
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, bonusIndex: number) => {
    setFieldValue(
      `bonuses[${bonusIndex}].playersID`,
      [].slice.call(e.target.selectedOptions).map((option: HTMLOptionElement) => option.value),
    )
  }

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
                  <Field
                    type="checkbox"
                    name={`bonuses[${bonusIndex}].checked`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onCheckboxChange(e, bonusIndex)
                    }
                  />
                  {name}
                  <Field
                    as="select"
                    multiple
                    name={`bonuses[${bonusIndex}].playersID`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      onSelectChange(e, bonusIndex)
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
