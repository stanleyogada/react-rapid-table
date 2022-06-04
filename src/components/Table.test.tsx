import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import { Table } from './Table'
import { TRow, TRowsOptions, TTable } from '../types'

const setUp = (options?: {
  rowsOptions?: TRowsOptions
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
              { id: 1, name: 'test' },
              { id: 2, name: 'test' },
              { id: 3, name: 'test' }
            ],
      isLoading: options?.rowsIsLoading,
      error: options?.rowsError,
      options: options?.rowsOptions
    },
    columns: [{ id: 'name' }]
  }

  return render(<Table {...props} />)
}

describe('Table component', () => {
  test('renders only 1 table 1 thead and 1 tbody: renders numbers of rows correctly', () => {
    const screen = setUp()

    expect(screen.getByTestId('table')).toBeInTheDocument()
    expect(screen.getByTestId('thead')).toBeInTheDocument()
    expect(screen.getByTestId('tbody')).toBeInTheDocument()
    expect(screen.getAllByTestId('row').length).toBe(4)
  })

  test('ensures all states (`loading`, `error` and `data`) remders without interception eachother', () => {
    let screen = setUp({
      rowsIsLoading: true,
      rowsError: new Error('test err!')
    })

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()

    cleanup()
    screen = setUp({ rowsIsLoading: true, rowsData: null, rowsError: null })
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()

    cleanup()
    screen = setUp({
      rowsIsLoading: false,
      rowsData: null,
      rowsError: null
    })

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    // This ensures that infinite scrolling could be implemented
    cleanup()
    screen = setUp({
      rowsIsLoading: true,
      rowsData: [{ id: 1 }],
      rowsError: new Error('test err!')
    })
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  test('ensures rowsOptions: `renderLoading` and `renderError` are called correctly', () => {
    let renderLoading = jest.fn()
    let renderError = jest.fn()

    setUp({
      rowsIsLoading: true,
      rowsError: null,
      rowsOptions: {
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
    setUp({
      rowsIsLoading: false,
      rowsError: new Error('test err!'), // Any type can be trown as error
      rowsOptions: {
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
    setUp({ rowsIsLoading: true, rowsError: true, rowsOptions: {} })

    expect(renderLoading).not.toHaveBeenCalled()
    expect(renderError).not.toHaveBeenCalled()
  })
})
