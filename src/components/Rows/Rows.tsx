import * as React from 'react'

interface Props {
  data: {
    [key: string]: any
  }[]
  columns: {
    id: string
  }[]
}

const Rows: React.FC<Props> = ({ data, columns }) => {
  return (
    <div>
      {data.map((row, index) => (
        <div key={index} data-testid='row'>
          {columns.map(({ id }) => (
            <div key={id} data-testid='cell'>
              {row[id]}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Rows
