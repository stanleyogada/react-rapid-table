import * as React from 'react'
import Cell from '../Cell/Cell'
import { TColumn, TRow, TRowsOptions } from '../../types'
import styles from '../styles.module.css'

interface TRows {
  data: TRow[]
  columns: TColumn[]
  rowsOptions?: TRowsOptions
}

const Rows: React.FC<TRows> = ({ data, columns, rowsOptions }) => {
  const hardcoded_Style = {
    gridTemplateColumns: `${columns.reduce(
      (acc, col) =>
        `minmax(${col.minFractionOrWidth || '200px'}, ${
          col.maxFractionOrWidth || '1fr'
        }) ` + acc,
      ''
    )}`
  }

  return (
    <React.Fragment>
      {data.map((row, index) => (
        <div
          key={row.id}
          data-testid='row'
          className={styles.row}
          style={hardcoded_Style}
        >
          {rowsOptions?.showNumbers && (
            <Cell
              text={
                typeof rowsOptions.showNumbers === 'function'
                  ? rowsOptions.showNumbers(index + 1)
                  : index + 1
              }
              testId='cell-number'
            />
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
    </React.Fragment>
  )
}

export default Rows
