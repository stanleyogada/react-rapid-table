import * as React from 'react'
import Cell from '../Cell/Cell'

export type TRowsOptions = {
  showNumbers?: boolean
}

interface TRows {
  data: {
    id: number | string
    [key: string]: any
  }[]
  columns: {
    id: number | string
    renderCell?: (cellData: any) => React.ReactNode | string
    options?: TRowsOptions
  }[]
}

const Rows: React.FC<TRows> = ({ data, columns }) => {
  return (
    <div>
      {data.map((row, index) => (
        <div key={row.id} data-testid='row'>
          <Cell text={index + 1} testId='cell-number' />

          {columns.map(({ id, renderCell }) => (
            <Cell
              key={`${row.id}-${id}`}
              text={renderCell ? () => renderCell(row[id]) : row[id]}
              testId='cell'
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Rows
