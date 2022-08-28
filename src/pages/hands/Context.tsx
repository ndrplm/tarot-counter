import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Hand } from '../../types'

type HandsContextTuple = [hands: Hand[], setHand: React.Dispatch<React.SetStateAction<Hand[]>>]
export const HandsContext = createContext<HandsContextTuple>([[], () => {}])

export const HandsContextComponent = () => {
  const [hands, setHands] = useState(JSON.parse(sessionStorage.hands || null) || [])

  return (
    <HandsContext.Provider value={[hands, setHands]}>
      <Outlet />
    </HandsContext.Provider>
  )
}

export default HandsContextComponent
