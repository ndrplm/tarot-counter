import { useRef, useState } from 'react'
import Title from '../design_system/Title'

interface Player {
  name: string
}

const Index = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [players, setPlayers] = useState<Player[]>([])

  const addPlayer = () => {
    if (!inputRef?.current?.value) return
    setPlayers([...players, { name: inputRef.current.value }])
    inputRef.current.value = ''
  }

  const removePlayer = (selectedPlayer: Player) => {
    setPlayers(players => players.filter(({ name }) => name !== selectedPlayer.name))
  }

  return (
    <>
      <Title.H1>Ajouter des joueurs</Title.H1>
      <input ref={inputRef} type="text" />
      <button onClick={addPlayer}>Ajouter</button>

      {players.map(player => (
        <div key={player.name}>
          <span>{player.name}</span> <button onClick={() => removePlayer(player)}>Supprimer</button>
        </div>
      ))}
    </>
  )
}

export default Index
