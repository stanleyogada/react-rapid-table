import * as React from 'react'
import Cell from '../Cell/Cell'
import { TColumn, TRow, TRowsOptions } from '../../types'
import styles from '../styles.module.css'

interface TRows {
  data: TRow[]
  columns: TColumn[]
  rowsOptions?: TRowsOptions
  onCellClick?: (id: string | number) => void
  renderActionCell?: () => string | number | React.ReactNode
}

const Rows: React.FC<TRows> = ({
  data,
  columns,
  rowsOptions,
  onCellClick,
  renderActionCell
}) => {
  const hardcoded_Style = {
    gridTemplateColumns: `${columns.reduce((acc, col) => {
      const columnMinFractionOrWidth =
        col.minFractionOrWidth || 100 / columns.length + '%'
      const columnMaxFractionOrWidth = col.maxFractionOrWidth || '1fr'

      return (
        acc +
        ` minmax(${columnMinFractionOrWidth}, ${columnMaxFractionOrWidth})`
      )
    }, '')}`
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

          {columns.map(({ id, renderTbodyCell }) => (
            <Cell
              key={`${row.id}-${id}`}
              text={renderTbodyCell ? () => renderTbodyCell(row[id]) : row[id]}
              testId='cell'
              onClick={onCellClick?.bind(null, id)}
            />
          ))}

          {renderActionCell?.()}
        </div>
      ))}
    </React.Fragment>
  )
}

export default Rows
