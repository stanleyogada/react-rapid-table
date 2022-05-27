import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Rows, { TRowsOptions } from './Rows'

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

  test('renders renderCell works as expected', () => {
    const props = {
      data: [{ id: 1, name: { text: 'RichCode', photo: '/pic.test' } }],
      columns: [
        {
          id: 'name',
          renderCell: (cellData: any) => (
            <>
              <p>{cellData.text}</p>
              <img src={cellData.photo} alt={cellData.text} />
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
    const setup = (options: TRowsOptions) => {
      const props = {
        data: [
          { id: 1, name: 'test' },
          { id: 2, name: 'some' },
          { id: 3, name: 'more' },
          { id: 4, name: 'cases' }
        ],
        columns: [{ id: 'name' }],
        options
      }

      return render(<Rows {...props} />)
    }

    test('renders number option', () => {
      const screen = setup({ showNumbers: true })

      expect(screen.getAllByTestId('cell-number').length).toBe(4)
      expect(screen.getAllByTestId('cell-number')[0]).toHaveTextContent('1')
      expect(screen.getAllByTestId('cell-number')[1]).toHaveTextContent('2')
      expect(screen.getAllByTestId('cell-number')[2]).toHaveTextContent('3')
      expect(screen.getAllByTestId('cell-number')[3]).toHaveTextContent('4')
    })
  })
})
