import * as React from 'react'
import { TCell } from '../../types'

const Cell: React.FC<TCell> = ({ text, testId }) => {
  return (
    <div data-testid={testId || ''}>
      {typeof text === 'function' ? text() : text}
    </div>
  )
}

export default Cell
