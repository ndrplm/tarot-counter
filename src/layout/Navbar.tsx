import Link from '../design_system/Link'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  height: 40px;
  background-color: gray;
`
const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const ListItem = styled.li`
  display: inline;
`

const Navbar = () => (
  <NavbarContainer>
    <List>
      <ListItem>
        <Link to="/">Joueurs</Link>
      </ListItem>
      <ListItem>
        <Link to="hands">Donnes</Link>
      </ListItem>
      <ListItem>
        <Link to="score">Score</Link>
      </ListItem>
    </List>
  </NavbarContainer>
)

export default Navbar
