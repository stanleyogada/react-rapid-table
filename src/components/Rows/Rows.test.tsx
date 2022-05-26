import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Rows from './Rows'

describe('Row component', () => {
  test('renders data prop correctly', () => {
    const screen = render(
      <Rows
        data={[
          { id: 1, name: 'RichCode', age: '20', height: '5.5' },
          { id: 2, name: 'Johnson', age: '30', height: '6.5' }
        ]}
        columns={[{ id: 'name' }, { id: 'age' }, { id: 'height' }]}
      />
    )

    expect(screen.getAllByTestId('row').length).toBe(2)
    expect(screen.getAllByTestId('cell').length).toBe(6)
  })
})
