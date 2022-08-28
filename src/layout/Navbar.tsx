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

const NAVIGATION_ITEMS = [
  {
    path: '/',
    label: 'Joueurs',
  },
  {
    path: 'hands',
    label: 'Donnes',
  },
  {
    path: 'score',
    label: 'Score',
  },
]

const Navbar = () => (
  <NavbarContainer>
    <List>
      {NAVIGATION_ITEMS.map(({ path, label }) => (
        <ListItem key={path}>
          <Link to={path}>{label}</Link>
        </ListItem>
      ))}
    </List>
  </NavbarContainer>
)

export default Navbar
