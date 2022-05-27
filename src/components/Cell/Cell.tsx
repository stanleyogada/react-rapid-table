import * as React from 'react'

interface TCell {
  text: string | React.ReactNode | (() => React.ReactNode | string)
  testId?: string
}

const Cell: React.FC<TCell> = ({ text, testId }) => {
  return (
    <div data-testid={testId || ''}>
      {typeof text === 'function' ? text() : text}
    </div>
  )
}

export default Cell
