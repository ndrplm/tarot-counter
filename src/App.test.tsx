import { render, screen } from '@testing-library/react'
import App from './App'

test('app works', () => {
  render(<App />)
  const title = screen.getByText(/App works !/i)
  expect(title).toBeInTheDocument()
})
