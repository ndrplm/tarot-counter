import { useNavigate } from 'react-router-dom'
import { Hand } from '../../types'

const Index = () => {
  const navigate = useNavigate()
  const hands: Hand[] = sessionStorage.getItem('hands') ? JSON.parse(sessionStorage.hands) : [] // not very elegant but i'll find another way to have a default empty array

  const createNewHand = () => {
    const id = Date.now()
    hands.push({ id: `${id}` })
    sessionStorage.setItem('hands', JSON.stringify(hands))
    navigate(id)
  }
  return (
    <>
      <div>
        {hands?.map(({ id }) => (
          <div key={id}>{id}</div>
        ))}
      </div>
      <button onClick={createNewHand}>Nouvelle donne</button>
    </>
  )
}

export default Index
