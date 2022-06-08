import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import THead from './THead'
import { TSortByTHeadColumnId, TTHead } from '../../types'

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

  test('renders a custom cell', () => {
    let props: TTHead = {
      columns: [{ id: 'name' }],
      renderCustomCell: (_cellValue: any) => <h1>renderedCell</h1>
    }

    let screen = render(<THead {...props} />)

    expect(
      screen.getByRole('heading', { name: /renderedCell/i })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('heading', { name: /renderedCell/i }).length
    ).toBe(1)
    expect(
      screen.getAllByRole('heading', { name: /renderedCell/i }).length
    ).not.toBeGreaterThan(1)

    cleanup()

    const renderCustomCell = jest.fn(
      (cellValue: any, sortByTHeadColumnId: TSortByTHeadColumnId) => (
        <h1>
          {cellValue}, {sortByTHeadColumnId?.id},{' '}
          {sortByTHeadColumnId?.direction}
        </h1>
      )
    )

    props = {
      columns: [{ id: 'name' }],
      renderCustomCell,
      sortByTHeadColumnId: { id: 'name', direction: 'asc' }
    }
    screen = render(<THead {...props} />)

    expect(renderCustomCell).toHaveBeenCalledTimes(1)
    expect(renderCustomCell).toHaveBeenCalledWith('name', {
      id: 'name',
      direction: 'asc'
    })
  })
})
