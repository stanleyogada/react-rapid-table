import * as React from 'react'
import { TCell } from '../../types'

const Cell: React.FC<TCell> = ({ text, testId, onClick, styles }) => {
  return (
    <div
      data-testid={testId || ''}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement> | undefined}
      style={styles}
    >
      {typeof text === 'function' ? text() : text}
    </div>
  )
}

export default Cell
