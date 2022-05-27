import * as React from 'react'

interface TCell {
  text: string | React.ReactNode | (() => React.ReactNode | string)
}

const Cell: React.FC<TCell> = ({ text }) => {
  return (
    <div data-testid='cell'>{typeof text === 'function' ? text() : text}</div>
  )
}

export default Cell
