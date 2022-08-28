import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HandsContext } from '../../App'

const Index = () => {
  const navigate = useNavigate()
  const [hands, setHands] = useContext(HandsContext)
  const createNewHand = () => {
    const id: string = `${Date.now()}`
    hands.push({ id })
    sessionStorage.setItem('hands', JSON.stringify(hands))
    setHands(hands)
    navigate(id)
  }
  return (
    <>
      <div>
        {hands.map(({ id }) => (
          <div key={id}>{id}</div>
        ))}
      </div>
      <button onClick={createNewHand}>Nouvelle donne</button>
    </>
  )
}

export default Index
