import { ReactNode } from 'react'
import styled from 'styled-components'
import { spacing } from '../design_system/spacing'
import Navbar from './Navbar'

interface Props {
  children?: ReactNode
}

const StyledMain = styled.main`
  padding: ${spacing.l};
`

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <StyledMain>{children}</StyledMain>
  </>
)

export default Layout
