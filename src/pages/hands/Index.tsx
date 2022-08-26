import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hand } from '../../types'

export const HandsContext = createContext<Hand[]>([])

const Index = () => {
  const navigate = useNavigate()
  const hands: Hand[] = JSON.parse(sessionStorage.hands) || [] // not very elegant but i'll find another way to have a default empty array

  const createNewHand = () => {
    const id: string = `${Date.now()}`
    hands.push({ id })
    sessionStorage.setItem('hands', JSON.stringify(hands))
    navigate(id)
  }
  return (
    <HandsContext.Provider value={hands}>
      <div>
        {hands?.map(({ id }) => (
          <div key={id}>{id}</div>
        ))}
      </div>
      <button onClick={createNewHand}>Nouvelle donne</button>
    </HandsContext.Provider>
  )
}

export default Index
