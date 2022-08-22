import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Joueurs</Link>
      </li>
      <li>
        <Link to="hands">Donnes</Link>
      </li>
      <li>
        <Link to="score">Score</Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
