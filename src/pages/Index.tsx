import { useState } from 'react'
import Title from '../design_system/Title'
import { Player } from '../types'

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const addPlayer = () => {
    setPlayers([...players, { name: inputValue, id: `${Date.now()}` }])
    setInputValue('')
  }

  const removePlayer = (playerId: string) => {
    setPlayers(players => players.filter(({ id }) => id !== playerId))
  }

  return (
    <>
      <Title.H1>Ajouter des joueurs</Title.H1>
      <div>
        Le nombre de joueurs doit être compris entre 3 et 5, et le nom de chaque joueur doit être
        unique
      </div>

      <label htmlFor="player-name">Nom du joueur</label>
      <input
        name="player-name"
        type="text"
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={addPlayer}>Ajouter</button>

      {players.map(({ id, name }) => (
        <div key={id}>
          <span>{name}</span>
          <button onClick={() => removePlayer(id)}>Supprimer</button>
        </div>
      ))}
    </>
  )
}

export default Index
