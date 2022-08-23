import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../design_system/Title'
import { Player } from '../types'

const Index = () => {
  const navigate = useNavigate()
  const defaultPlayers: Player[] = sessionStorage.getItem('players')
    ? JSON.parse(sessionStorage.players)
    : [] // not very elegant but i'll find another way to have a default empty array

  const inputRef = useRef<HTMLInputElement>(null)
  const [players, setPlayers] = useState<Player[]>(defaultPlayers)
  const isInvalid = players.length < 3 || players.length > 5

  useEffect(() => {
    sessionStorage.setItem('players', JSON.stringify(players))
  }, [players])

  const addPlayer = () => {
    if (!inputRef?.current?.value) return
    setPlayers([...players, { name: inputRef.current.value, id: Date.now() }])
    inputRef.current.value = ''
  }

  const removePlayer = (selectedPlayer: Player) => {
    setPlayers(players => players.filter(({ name }) => name !== selectedPlayer.name))
  }

  const onValidateClick = () => {
    if (isInvalid) return
    navigate('hands')
  }

  return (
    <>
      <Title.H1>Ajouter des joueurs</Title.H1>

      <label htmlFor="player-name">Nom du joueur</label>
      <input name="player-name" ref={inputRef} type="text" />
      <button onClick={addPlayer}>Ajouter</button>

      {players.map(player => (
        <div key={player.name}>
          <span>{player.name}</span>
          <button onClick={() => removePlayer(player)}>Supprimer</button>
        </div>
      ))}

      <div>
        {isInvalid && <span>Le nombre de joueur doit être compris entre 3 et 5</span>}
        <button onClick={onValidateClick}>Valider</button>
      </div>
    </>
  )
}

export default Index
