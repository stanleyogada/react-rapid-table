import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Table } from './Table'
import { TOtherOptions, TRow, TRowsOptions, TTable } from '../types'

const setup = (options?: {
  otherOptions?: TOtherOptions
  tbodyOptions?: TRowsOptions
  rowsIsLoading?: boolean
  rowsData?: TRow[] | null
  rowsError?: any
}) => {
  const props: TTable = {
    rows: {
      data:
        options?.rowsData !== undefined
          ? options.rowsData
          : [
              { id: '1', name: 'beca', age: 10 },
              { id: '2', name: 'adam', age: 30 },
              { id: '3', name: 'cup', age: 3 }
            ],
      isLoading: options?.rowsIsLoading,
      error: options?.rowsError
    },
    columns: [{ id: 'name' }, { id: 'age' }],
    tbodyOptions: options?.tbodyOptions,
    otherOptions: options?.otherOptions
  }

  return render(<Table {...props} />)
}

describe('Table component', () => {
  test('renders only 1 table 1 thead and 1 tbody: renders numbers of rows correctly', () => {
    const screen = setup()

    expect(screen.getByTestId('table')).toBeInTheDocument()
    expect(screen.getByTestId('thead')).toBeInTheDocument()
    expect(screen.getByTestId('tbody')).toBeInTheDocument()
    expect(screen.getAllByTestId('row').length).toBe(4)
  })

  test('ensures all states (`loading`, `error` and `data`) renders without interception each other', () => {
    let screen = setup({
      rowsIsLoading: true,
      rowsError: new Error('test err!')
    })

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()

    cleanup()
    screen = setup({ rowsIsLoading: true, rowsData: null, rowsError: null })
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()

    cleanup()
    screen = setup({
      rowsIsLoading: false,
      rowsData: null,
      rowsError: null
    })

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    // This ensures that infinite scrolling could be implemented
    cleanup()
    screen = setup({
      rowsIsLoading: true,
      rowsData: [{ id: '1', name: 'test' }],
      rowsError: new Error('test err!')
    })
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  test('ensures tbodyOptions: `renderLoading` and `renderError` are called correctly', () => {
    let renderLoading = jest.fn()
    let renderError = jest.fn()

    setup({
      rowsIsLoading: true,
      rowsError: null,
      tbodyOptions: {
        renderLoading,
        renderError
      }
    })

    expect(renderLoading).toHaveBeenCalled()
    expect(renderLoading).toHaveBeenCalledTimes(1)
    expect(renderLoading).toHaveBeenCalledWith()

    expect(renderError).not.toHaveBeenCalled()

    cleanup()
    renderLoading = jest.fn()
    renderError = jest.fn()
    setup({
      rowsIsLoading: false,
      rowsError: new Error('test err!'), // Any type can be thrown as error
      tbodyOptions: {
        renderLoading,
        renderError
      }
    })

    expect(renderLoading).not.toHaveBeenCalled()
    expect(renderLoading).toHaveBeenCalledTimes(0)

    expect(renderError).toHaveBeenCalled()
    expect(renderError).toHaveBeenCalledTimes(1)
    expect(renderError).toHaveBeenCalledWith(new Error('test err!'))
    expect(renderError).not.toHaveBeenCalledWith(true)
    expect(renderError).not.toHaveBeenCalledWith(2)

    // Test when no render functions are provided as props
    cleanup()
    renderLoading = jest.fn()
    renderError = jest.fn()
    setup({ rowsIsLoading: true, rowsError: true, tbodyOptions: {} })

    expect(renderLoading).not.toHaveBeenCalled()
    expect(renderError).not.toHaveBeenCalled()
  })

  test('ensure sorts by column correctly', async () => {
    const screen = setup()
    const thead = screen.getByTestId('thead')
    const name_theadColumnCell = thead.querySelectorAll(
      '[data-testid="cell"]'
    )[0]
    const age_theadColumnCell = thead.querySelectorAll(
      '[data-testid="cell"]'
    )[1]

    expect(name_theadColumnCell).not.toHaveTextContent(/sortBy:name-default/i)
    user.click(name_theadColumnCell)
    screen.debug() //?
    expect(name_theadColumnCell).toHaveTextContent(/sortBy:name-asc/i)
    user.click(name_theadColumnCell)

    expect(name_theadColumnCell).toHaveTextContent(/sortBy:name-desc/i)
    user.click(name_theadColumnCell)
    expect(name_theadColumnCell).toHaveTextContent(/sortBy:name-default/i)

    expect(age_theadColumnCell).not.toHaveTextContent(/sortBy:age-default/i)
    user.click(age_theadColumnCell)
    expect(age_theadColumnCell).toHaveTextContent(/sortBy:age-asc/i)
    expect(name_theadColumnCell).not.toHaveTextContent(/sortBy:name-default/i)
    user.click(age_theadColumnCell)
    expect(age_theadColumnCell).toHaveTextContent(/sortBy:age-desc/i)
    user.click(age_theadColumnCell)
    expect(age_theadColumnCell).toHaveTextContent(/sortBy:age-default/i)
  })

  test('renders action column correctly', async () => {
    global.console.log = jest.fn()
    const handleActionMoreButtonClick = jest.fn((row: TRow) => console.log(row))

    const screen = setup({
      otherOptions: {
        actionColumn: {
          renderTheadCell: () => 'action',
          renderTbodyCell: (row: TRow) => (
            <button onClick={() => handleActionMoreButtonClick(row)}>
              more
            </button>
          )
        }
      }
    })

    expect(screen.getAllByText('action').length).toBe(1)
    expect(screen.getAllByRole('button', { name: 'more' }).length).toBe(3)

    user.click(screen.getAllByRole('button', { name: 'more' })[0])
    expect(handleActionMoreButtonClick).toHaveBeenCalled()
    expect(handleActionMoreButtonClick).toHaveBeenCalledTimes(1)
    expect(handleActionMoreButtonClick).toHaveBeenCalledWith({
      id: '1',
      name: 'beca',
      age: 10
    })
    // expect console.log to have been called
    expect(console.log).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith({
      id: '1',
      name: 'beca',
      age: 10
    })
  })
})
