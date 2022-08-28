import Layout from './layout/Layout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Index from './pages/Index'
import HandsIndex from './pages/hands/Index'
import HandIdIndex from './pages/hands/_handId/Index'
import ScoreIndex from './pages/score/Index'
import NotFound from './pages/NotFound'
import { createContext, useState } from 'react'
import { Player, Hand } from './types'

type PlayersContextTuple = [
  players: Player[],
  setHand: React.Dispatch<React.SetStateAction<Player[]>>,
]
type HandsContextTuple = [hands: Hand[], setHand: React.Dispatch<React.SetStateAction<Hand[]>>]

// this smells... TODO: check how I can populate my context gradually without having to check for undefined or have an empty arrow funct
export const PlayersContext = createContext<PlayersContextTuple>([[], () => {}])
export const HandsContext = createContext<HandsContextTuple>([[], () => {}])

const App = () => {
  const defaultPlayers: Player[] = JSON.parse(sessionStorage.players || null) || []
  const defaultHands: Hand[] = JSON.parse(sessionStorage.hands || null) || []
  const [players, setPlayers] = useState(defaultPlayers)
  const [hands, setHands] = useState(defaultHands)

  return (
    <BrowserRouter>
      <PlayersContext.Provider value={[players, setPlayers]}>
        <HandsContext.Provider value={[hands, setHands]}>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="hands">
                <Route path=":id" element={<HandIdIndex />} />
                <Route index element={<HandsIndex />} />
              </Route>
              <Route path="score" element={<ScoreIndex />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HandsContext.Provider>
      </PlayersContext.Provider>
    </BrowserRouter>
  )
}

export default App
