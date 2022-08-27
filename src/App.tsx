import Layout from './layout/Layout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Index from './pages/Index'
import HandsIndex from './pages/hands/Index'
import HandIdIndex from './pages/hands/_handId/Index'
import NotFound from './pages/NotFound'
import { createContext, useState } from 'react'
import { Player } from './types'
import HandsContextComponent from './pages/hands/Context'

type PlayersContextTuple = [
  players: Player[],
  setHand: React.Dispatch<React.SetStateAction<Player[]>>,
]
// this smells... TODO: check how I can populate my context gradually without having to check for undefined or have an empty arrow funct
export const PlayersContext = createContext<PlayersContextTuple>([[], () => {}])

const App = () => {
  const defaultPlayers: Player[] = JSON.parse(sessionStorage.players || null) || []
  const [players, setPlayers] = useState(defaultPlayers)

  return (
    <BrowserRouter>
      <PlayersContext.Provider value={[players, setPlayers]}>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="hands" element={<HandsContextComponent />}>
              <Route path=":id" element={<HandIdIndex />} />
              <Route index element={<HandsIndex />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PlayersContext.Provider>
    </BrowserRouter>
  )
}

export default App
