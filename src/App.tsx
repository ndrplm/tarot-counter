import Layout from './layout/Layout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Index from './pages/Index'
import HandsIndex from './pages/hands/Index'
import HandIdIndex from './pages/hands/_handId/Index'
import NotFound from './pages/NotFound'
import { createContext } from 'react'
import { Player } from './types'

export const PlayersContext = createContext<Player[]>([])

const App = () => {
  const players: Player[] = JSON.parse(sessionStorage.players || null) || []

  return (
    <BrowserRouter>
      <PlayersContext.Provider value={players}>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="hands">
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
