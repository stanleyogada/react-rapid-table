import * as React from 'react'
import Cell from '../Cell/Cell'
import { TColumn, TRow, TRowsOptions } from '../../types'

interface TRows {
  data: TRow[]
  columns: TColumn[]
  rowsOptions?: TRowsOptions
  onCellClick?: (id: string | number) => void
  renderActionCell?: (row: TRow) => string | number | React.ReactNode
  actionCellWidth?: string
  onClick?: (row: TRow) => void
  cellStyles?: React.CSSProperties
}

const Rows: React.FC<TRows> = ({
  data,
  columns,
  rowsOptions,
  onCellClick,
  renderActionCell,
  actionCellWidth = '60px',
  onClick,
  cellStyles
}) => {
  const getHardcodedStyle = () => {
    const newCols: TColumn[] = [...columns]
    const actionColumn: TColumn = {
      id: 'action',
      maxFractionOrWidth: actionCellWidth,
      minFractionOrWidth: actionCellWidth
    }
    if (renderActionCell) newCols.push(actionColumn)

    return {
      gridTemplateColumns: `${newCols.reduce((acc, col) => {
        let columnMinFractionOrWidth =
          col.minFractionOrWidth || 100 / columns.length + '%'

        if (renderActionCell)
          columnMinFractionOrWidth = `calc(${columnMinFractionOrWidth} - ${actionCellWidth})`

        const columnMaxFractionOrWidth = col.maxFractionOrWidth || '1fr'

        return (
          acc +
          ` minmax(${columnMinFractionOrWidth}, ${columnMaxFractionOrWidth})`
        )
      }, '')}`
    }
  }

  return (
    <React.Fragment>
      {data.map((row, index) => (
        <div
          key={row.id}
          data-testid='row'
          style={getHardcodedStyle()}
          onClick={() => onClick?.(row)}
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
              styles={cellStyles}
            />
          ))}

          {renderActionCell && (
            <div
              // separate row event listener from the action cell event listener
              onClick={(e) => e.stopPropagation()}
            >
              <Cell text={renderActionCell(row)} testId='action-cell' />
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  )
}

export default Rows
