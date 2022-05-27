import * as React from 'react'
import Cell from '../Cell/Cell'

interface TRows {
  data: {
    id: number | string
    [key: string]: any
  }[]
  columns: {
    id: number | string
    renderCell?: (cellData: any) => React.ReactNode | string
  }[]
}

const Rows: React.FC<TRows> = ({ data, columns }) => {
  return (
    <div>
      {data.map((row) => (
        <div key={row.id} data-testid='row'>
          {columns.map(({ id, renderCell }) => (
            <Cell
              key={`${row.id}-${id}`}
              text={renderCell ? () => renderCell(row[id]) : row[id]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Rows
