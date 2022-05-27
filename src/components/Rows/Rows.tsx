import * as React from 'react'
import Cell from '../Cell/Cell'
import { TColumn, TRow, TRowsOptions } from '../types'

interface TRows {
  data: TRow[]
  columns: TColumn[]
  rowsOptions?: TRowsOptions
}

const Rows: React.FC<TRows> = ({ data, columns, rowsOptions }) => {
  return (
    <div>
      {data.map((row, index) => (
        <div key={row.id} data-testid='row'>
          {rowsOptions?.showNumbers && (
            <Cell text={index + 1} testId='cell-number' />
          )}

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
