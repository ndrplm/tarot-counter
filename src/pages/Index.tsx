import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../design_system/Title'
import { Player } from '../types'

const MAX_PLAYERS = 5
const MIN_PLAYERS = 3

const Index = () => {
  const navigate = useNavigate()
  const defaultPlayers: Player[] = sessionStorage.getItem('players')
    ? JSON.parse(sessionStorage.players)
    : [] // not very elegant but i'll find another way to have a default empty array

  const inputRef = useRef<HTMLInputElement>(null)
  const [players, setPlayers] = useState<Player[]>(defaultPlayers)
  const isInvalid = players.length < MIN_PLAYERS || players.length > MAX_PLAYERS

  useEffect(() => {
    sessionStorage.setItem('players', JSON.stringify(players))
  }, [players])

  const addPlayer = () => {
    if (!inputRef?.current?.value) return
    if (players.length === MAX_PLAYERS) return
    if (players.some(player => player.name === inputRef?.current?.value)) return

    setPlayers([...players, { name: inputRef.current.value, id: Date.now() }])
    inputRef.current.value = ''
  }

  const removePlayer = (playerId: number) => {
    if (players.length === MIN_PLAYERS) return

    setPlayers(players => players.filter(({ id }) => id !== playerId))
  }

  const onValidateClick = () => {
    if (isInvalid) return

    navigate('hands')
  }

  return (
    <>
      <Title.H1>Ajouter des joueurs</Title.H1>
      <div>
        Le nombre de joueurs doit être compris entre 3 et 5, et le nom de chaque joueur doit être
        unique
      </div>

      <label htmlFor="player-name">Nom du joueur</label>
      <input name="player-name" ref={inputRef} type="text" />
      <button onClick={addPlayer}>Ajouter</button>

      {players.map(({ id, name }) => (
        <div key={id}>
          <span>{name}</span>
          <button onClick={() => removePlayer(id)}>Supprimer</button>
        </div>
      ))}

      <div>
        <button onClick={onValidateClick}>Valider</button>
      </div>
    </>
  )
}

export default Index
