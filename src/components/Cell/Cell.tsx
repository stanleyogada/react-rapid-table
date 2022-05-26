import * as React from 'react'

interface Props {
  text: string | React.ReactNode | (() => React.ReactNode | string)
}

const Cell: React.FC<Props> = ({ text }) => {
  return <div>{typeof text === 'function' ? text() : text}</div>
}

export default Cell
