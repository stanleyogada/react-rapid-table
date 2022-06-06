import * as React from 'react'
import Rows from '../Rows/Rows'
import { TColumn, TRow, TSortByTHeadColumnId } from '../../types'

interface TTHead {
  columns: TColumn[]
  onCellClick?: (id: string | number) => void
  sortByTHeadColumnId?: TSortByTHeadColumnId
}

const THead: React.FC<TTHead> = ({
  columns,
  onCellClick,
  sortByTHeadColumnId
}) => {
  const rowsData: TRow[] = [{ id: 1 }]

  const renderCell = (cellValue: string) => (
    <React.Fragment>
      {cellValue}

      <span data-testid='thead-col-sort-icons'>
        {sortByTHeadColumnId?.id && sortByTHeadColumnId?.direction ? (
          <React.Fragment>
            {sortByTHeadColumnId.direction === 'asc' && (
              <React.Fragment>
                <span data-testid='thead-col-sort-icon-asc' />
                <span data-testid='thead-col-sort-text'>
                  sortBy:{sortByTHeadColumnId?.id}-Asc
                </span>
              </React.Fragment>
            )}
            {sortByTHeadColumnId.direction === 'desc' && (
              <React.Fragment>
                <span data-testid='thead-col-sort-icon-desc' />
                <span data-testid='thead-col-sort-text'>
                  sortBy:{sortByTHeadColumnId?.id}-Desc
                </span>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span data-testid='thead-col-sort-icon-default' />
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
      renderCell: sortByTHeadColumnId?.id === col.id ? renderCell : undefined
    }
  })

  return (
    <div data-testid='thead'>
      <Rows data={rowsData} columns={columns} onCellClick={onCellClick} />
    </div>
  )
}

export default THead
