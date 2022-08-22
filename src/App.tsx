import Layout from './layout/Layout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Index from './pages/Index'
import HandsIndex from './pages/hands/Index'
import HandIdIndex from './pages/hands/_hand_id/Index'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
)

export default App
