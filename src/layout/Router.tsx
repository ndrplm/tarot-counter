import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from '../pages/Index'
import HandsIndex from '../pages/hands/Index'
import HandIdIndex from '../pages/hands/_hand_id/Index'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="hands">
        <Route path=":id" element={<HandIdIndex />} />
        <Route index element={<HandsIndex />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
