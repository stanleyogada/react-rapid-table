import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Cell from './Cell'

describe('Cell component', () => {
  describe('renders text prop correctly', () => {
    test('when prop is string', () => {
      const screen = render(<Cell text='test' />)
      expect(screen.getByText('test')).toBeInTheDocument()
    })

    test('when prop is callback', () => {
      const screen = render(
        <Cell
          text={() => (
            <>
              <h1>Heading</h1>
              Text
            </>
          )}
        />
      )

      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /heading/i
        })
      ).toBeInTheDocument()
      expect(screen.getByText(/text/i)).toBeInTheDocument()
    })
  })
})
