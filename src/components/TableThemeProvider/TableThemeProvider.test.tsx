import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TableThemeProvider } from './TableThemeProvider'
import { Table } from '../Table'
import { TTableThemeProviderProps } from '../../types'

const setup = (providersProps?: TTableThemeProviderProps) => {
  const tableProps = {
    rows: {
      data: [
        { id: '2', name: 'John', age: 30 },
        { id: '1', name: 'Jane', age: 28 }
      ]
    },
    columns: [{ id: 'name' }, { id: 'age' }]
  }

  const screen = render(
    <TableThemeProvider {...providersProps}>
      <Table {...tableProps} />
      <Table {...tableProps} />
    </TableThemeProvider>
  )

  return screen
}

describe('TableThemeProvider', () => {
  test('renders multiple Tables correctly', () => {
    const screen = setup()
    // screen.debug() //?
    expect(screen.getAllByTestId('table').length).toBe(2)
  })

  test('ensures global theming', () => {
    const screen = setup({
      styles: {
        thead: { background: 'green', color: 'white' },
        tbody: { background: 'blue' },
        table: { border: '1px solid black' },
        cell: { color: 'red' }
      }
    })

    screen.getAllByTestId('thead').forEach((thead) => {
      expect(thead).toHaveStyle('background: green')
      expect(thead).toHaveStyle('color: white')
    })

    screen
      .getAllByTestId('tbody')
      .forEach((tbody) => expect(tbody).toHaveStyle('background: blue'))

    screen
      .getAllByTestId('table')
      .forEach((table) => expect(table).toHaveStyle('border: 1px solid black'))

    screen.debug(screen.getAllByTestId('cell')) //?

    screen
      .getAllByTestId('cell')
      .forEach((cell) => expect(cell).toHaveStyle('color: red'))
  })
})
