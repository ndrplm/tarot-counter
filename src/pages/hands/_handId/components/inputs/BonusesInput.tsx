import { Field, FieldArray, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import { PlayersContext } from '../../../../../App'

import { Player } from '../../../../../types'
import { AfterGameInitialValues } from '../AfterGame'

const ChelemOption = ({ bonusIndex }: { bonusIndex: number }) => (
  <>
    <label htmlFor="bonus-chelem-announced">Annoncé ? </label>
    <Field id="bonus-chelem-announced" type="checkbox" name={`bonuses[${bonusIndex}].announced`} />

    <label htmlFor="bonus-chelem-announced">Réalisé ? </label>
    <Field id="bonus-chelem-announced" type="checkbox" name={`bonuses[${bonusIndex}].done`} />
  </>
)

const PoigneeOption = ({ bonusIndex }: { bonusIndex: number }) => (
  <>
    <label htmlFor="bonus-chelem-done">Type de poignee ? </label>
    <Field id="bonus-chelem-done" as="select" name={`bonuses[${bonusIndex}].type`}>
      <option value="">Selectionnez un type</option>
      <option value="simple">Simple</option>
      <option value="double">Double</option>
      <option value="triple">Triple</option>
    </Field>
  </>
)

const BonusesInput = () => {
  const [players] = useContext(PlayersContext)
  const { values, setFieldValue } = useFormikContext<AfterGameInitialValues>()
  // reset the players field when the checkbox is unchecked
  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    bonusIndex: number,
    bonusName: string,
  ) => {
    setFieldValue(`bonuses[${bonusIndex}].checked`, e.target.checked)
    if (!e.target.checked) {
      if (bonusName === 'poignee') setFieldValue(`bonuses[${bonusIndex}].type`, '')
      if (bonusName === 'chelem') {
        setFieldValue(`bonuses[${bonusIndex}].announced`, false)
        setFieldValue(`bonuses[${bonusIndex}].done`, false)
      }
    }
    setFieldValue(`bonuses[${bonusIndex}].playerID`, '')
  }

  return (
    <FieldArray name="bonuses">
      {() => (
        <>
          <label>Quelles sont les primes réalisées ?</label>
          {values.bonuses.map(({ name, checked }) => {
            const bonusIndex = values.bonuses.findIndex(bonus => bonus.name === name)

            return (
              <div key={name}>
                <>
                  <Field
                    type="checkbox"
                    name={`bonuses[${bonusIndex}].checked`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onCheckboxChange(e, bonusIndex, name)
                    }
                  />
                  {name}
                  <Field
                    as="select"
                    name={`bonuses[${bonusIndex}].playerID`}
                    disabled={!values.bonuses[bonusIndex].checked}
                  >
                    <option value="">Selectionnez un joueur</option>
                    {players.map((player: Player) => (
                      <option value={player.id}>{player.name}</option>
                    ))}
                  </Field>
                  {checked && name === 'chelem' && <ChelemOption bonusIndex={bonusIndex} />}
                  {checked && name === 'poignee' && <PoigneeOption bonusIndex={bonusIndex} />}
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
