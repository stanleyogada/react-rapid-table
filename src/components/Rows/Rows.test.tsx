import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import user from '@testing-library/user-event'
import Rows from './Rows'
import { TRow, TRowsOptions } from '../../types'

describe('Rows component', () => {
  test('renders rows and cells correctly', () => {
    const props = {
      data: [
        { id: 1, name: 'RichCode', age: '20', height: '5.5' },
        { id: 2, name: 'Johnson', age: '30', height: '6.5' }
      ],
      columns: [{ id: 'name' }, { id: 'age' }, { id: 'height' }]
    }
    const screen = render(<Rows {...props} />)

    expect(screen.getAllByTestId('row').length).toBe(props.data.length)
    expect(screen.getAllByTestId('cell').length).toBe(
      props.data.length * props.columns.length
    )
  })

  test('renders renderTbodyCell works as expected', () => {
    const props = {
      data: [{ id: 1, name: { text: 'RichCode', photo: '/pic.test' } }],
      columns: [
        {
          id: 'name',
          renderTbodyCell: (cellValue: any) => (
            <>
              <p>{cellValue.text}</p>
              <img src={cellValue.photo} alt={cellValue.text} />
            </>
          )
        }
      ]
    }
    const screen = render(<Rows {...props} />)

    expect(screen.getByAltText(props.data[0].name.text)).toBeInTheDocument()
    expect(screen.getByText(props.data[0].name.text)).toBeInTheDocument()
  })

  describe('When options prop is passed', () => {
    const setup = (
      rowsOptions?: TRowsOptions,
      renderActionCell?: (row: TRow) => string | number | React.ReactNode,
      onClick?: (row: TRow) => void
    ) => {
      const props = {
        data: [
          { id: 1, name: 'test' },
          { id: 2, name: 'some' }
        ],
        columns: [{ id: 'name' }],
        rowsOptions,
        renderActionCell,
        onClick
      }

      return render(<Rows {...props} />)
    }

    describe('showNumber', () => {
      test('When `NOT passed`, or is `undefined` or any falsy value: renders number option', () => {
        let screen = setup({ showNumbers: undefined })
        expect(screen.queryAllByTestId('cell-number').length).toBe(0)

        cleanup()
        screen = setup({ showNumbers: false })
        expect(screen.queryAllByTestId('cell-number').length).toBe(0)

        cleanup()
        screen = setup({})
        expect(screen.queryAllByTestId('cell-number').length).toBe(0)
      })

      test('When passed: renders number option', () => {
        const screen = setup({ showNumbers: true })

        expect(screen.getAllByTestId('cell-number').length).toBe(2)
        expect(screen.getAllByTestId('cell-number')[0]).toHaveTextContent('1')
        expect(screen.getAllByTestId('cell-number')[1]).toHaveTextContent('2')
        expect(screen.queryByText('3')).not.toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()
      })

      test('When passed: renders number option', () => {
        let screen = setup({
          showNumbers: (rowNumber: number) => `#${rowNumber}`
        })

        expect(screen.getAllByTestId('cell-number')[0]).toHaveTextContent('#1')
        expect(screen.getAllByTestId('cell-number')[1]).toHaveTextContent('#2')

        // Assert to make sure we can render `number` as `any` thing
        cleanup()
        screen = setup({
          showNumbers: () => <p>S/N</p>
        })
        expect(screen.getAllByTestId('cell-number')[0]).toHaveTextContent('S/N')
        expect(screen.getAllByTestId('cell-number')[1]).toHaveTextContent('S/N')
      })
    })

    test('renders action cell correctly', async () => {
      let screen = setup(undefined, () => 'action')
      expect(screen.getAllByText('action').length).toBe(2)
      expect(
        screen.queryByRole('button', { name: 'more' })
      ).not.toBeInTheDocument()

      cleanup()
      screen = setup(undefined, () => <button>more</button>)
      expect(screen.getAllByRole('button', { name: 'more' }).length).toBe(2)
      expect(screen.queryByText('action')).not.toBeInTheDocument()
    })

    test('ensures onRowClick can be passed', () => {
      global.console.log = jest.fn()
      const onRowClick = jest.fn((row: TRow) => console.log(row))
      let screen = setup(undefined, undefined, onRowClick)

      const firstRow = screen.getAllByTestId('row')[0]
      user.click(firstRow)
      expect(onRowClick).toHaveBeenCalledTimes(1)
      expect(onRowClick).toHaveBeenCalledWith({ id: 1, name: 'test' })
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith({ id: 1, name: 'test' })
    })
  })
})
