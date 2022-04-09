import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Index as Home } from './pages/Index';
import { Index as NewGame } from './pages/games/new/Index'
import { Index as GamesIndex } from './pages/games/Index'
import { Index as GameShow } from "./pages/games/_game_id/Index"
import { Container } from '@mui/material';


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="games">
            <Route path="new" element={<NewGame />} />
            <Route path=":id" element={<GameShow />} />
            <Route index element={<GamesIndex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
