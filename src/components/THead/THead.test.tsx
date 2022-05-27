import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import THead from './THead'

describe('THead component', () => {
  test('renders only 1 row correct', () => {
    const props = {
      columns: [{ id: 'name' }, { id: 'age' }, { id: 'height' }]
    }

    const screen = render(<THead {...props} />)
    expect(screen.getAllByTestId('row').length).toBe(1)

    // debug screen
    // screen.debug(screen.getAllByTestId('row'))//?
    expect(screen.getAllByTestId('cell').length).toBe(3)
    expect(screen.getAllByTestId('cell')[0]).toHaveTextContent(/name/i)
    expect(screen.getAllByTestId('cell')[1]).toHaveTextContent(/age/i)
    expect(screen.getAllByTestId('cell')[2]).toHaveTextContent(/height/i)
  })
})
