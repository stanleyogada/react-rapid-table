import * as React from 'react'
import Rows from '../Rows/Rows'
import { TRow, TTHead } from '../../types'

const THead: React.FC<TTHead> = ({
  columns,
  onCellClick,
  sortByTHeadColumnId,
  renderTheadCell
}) => {
  const rowsData: TRow[] = [{ id: 1 }]

  const renderTbodyCell = (cellValue: string) => (
    <React.Fragment>
      {cellValue}

      <span data-testid='thead-col-sort-icons'>
        {sortByTHeadColumnId?.id && sortByTHeadColumnId?.direction ? (
          <React.Fragment>
            {sortByTHeadColumnId.direction === 'asc' && (
              <React.Fragment>
                <span data-testid='thead-col-sort-icon-asc'>
                  <i>&#9650;</i>
                </span>
                <span data-testid='thead-col-sort-text'>
                  sortBy:{sortByTHeadColumnId?.id}-Asc
                </span>
              </React.Fragment>
            )}
            {sortByTHeadColumnId.direction === 'desc' && (
              <React.Fragment>
                <span data-testid='thead-col-sort-icon-desc'>
                  <i>&#9660;</i>
                </span>
                <span data-testid='thead-col-sort-text'>
                  sortBy:{sortByTHeadColumnId?.id}-Desc
                </span>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span data-testid='thead-col-sort-icon-default'>
              <i>&#9660;</i>
              <i>&#9650;</i>
            </span>
            <span data-testid='thead-col-sort-text'>
              sortBy:{sortByTHeadColumnId?.id}-Default
            </span>
          </React.Fragment>
        )}
      </span>
    </React.Fragment>
  )

  columns = columns.map((col) => {
    rowsData[0] = { ...rowsData[0], [col.id]: col.id }

    return {
      ...col,
      renderTbodyCell: renderTheadCell
        ? (cellValue: any) => renderTheadCell?.(cellValue, sortByTHeadColumnId)
        : sortByTHeadColumnId?.id === col.id
        ? renderTbodyCell
        : undefined
    }
  })

  return (
    <div data-testid='thead'>
      <Rows data={rowsData} columns={columns} onCellClick={onCellClick} />
    </div>
  )
}

export default THead
