import * as React from 'react'
import Rows from './Rows/Rows'
// import styles from './styles.module.css'
import THead from './THead/THead'
import { TRow, TSortByTHeadColumnId, TTable } from '../types'
import { useTheme } from './TableThemeProvider/context/useTheme'
import TableStyles from './TableStyles'

export const Table = ({
  id,
  columns,
  rows,
  tbodyOptions,
  theadOptions,
  otherOptions
}: TTable) => {
  const theme = useTheme()

  const [rowsData, setRowsData] = React.useState<undefined | null | TRow[]>(
    rows.data
  )

  const [sortByTHeadColumnId, setSortByTHeadColumnId] =
    React.useState<TSortByTHeadColumnId>({
      // id: otherOptions?.sortBy?.id, TODO: good suggestion by COPILOT: ADD `DEFAULT value` IN `OTHER_OPTIONS`
      // direction: otherOptions?.sortBy?.direction TODO: good suggestion by COPILOT: ADD `DEFAULT value` IN `OTHER_OPTIONS`
      id: undefined,
      direction: null
    })

  const handleSortByTHeadColumn = (columnId: number | string) => {
    setSortByTHeadColumnId((sortByTHeadColumnId) => {
      return {
        id: columnId,
        // toggle `asc`, then `desc` and then `null`
        direction:
          sortByTHeadColumnId.id === columnId
            ? sortByTHeadColumnId.direction === 'asc'
              ? 'desc'
              : sortByTHeadColumnId.direction === 'desc'
              ? null
              : 'asc'
            : 'asc'
      }
    })
  }

  React.useEffect(() => {
    let mounted = true

    if (sortByTHeadColumnId?.id) {
      if (sortByTHeadColumnId.direction == null && rows.data && mounted)
        //reset sort to original rowsData
        return setRowsData(rows.data)

      const newRowsData = [...(rowsData || [])]
      newRowsData.sort((a, b) => {
        const aValue: string | number = a[sortByTHeadColumnId.id as string]
        const bValue: string | number = b[sortByTHeadColumnId.id as string]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortByTHeadColumnId.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortByTHeadColumnId.direction === 'asc'
            ? aValue - bValue
            : bValue - aValue
        }

        return 0
      })

      if (mounted) setRowsData(newRowsData)
    }

    return () => {
      mounted = false
    }
  }, [sortByTHeadColumnId, rows.data])

  React.useEffect(() => {
    let mounted = true
    if (rows.data && mounted) setRowsData(rows.data)

    return () => {
      mounted = false
    }
  }, [rows.data])

  return (
    <div id={id}>
      {rowsData && (
        <TableStyles data-testid='table' style={theme?.styles?.table}>
          <THead
            styles={theme?.styles?.thead}
            cellStyles={theme?.styles?.cell}
            columns={columns}
            onCellClick={handleSortByTHeadColumn}
            sortByTHeadColumnId={sortByTHeadColumnId}
            renderTheadCell={theadOptions?.renderTheadCell}
            renderActionCell={
              otherOptions?.actionColumn?.renderTheadCell ||
              (otherOptions?.actionColumn?.renderTbodyCell
                ? () => (
                    <span data-testid='action-cell-thead-empty-content'></span>
                  )
                : undefined)
            }
            actionCellWidth={otherOptions?.actionColumn?.columnWidth}
          />

          <div data-testid='tbody' style={theme?.styles?.tbody}>
            {rowsData && (
              <Rows
                cellStyles={theme?.styles?.cell}
                data={rowsData}
                columns={columns}
                renderActionCell={otherOptions?.actionColumn?.renderTbodyCell}
                actionCellWidth={otherOptions?.actionColumn?.columnWidth}
                onClick={tbodyOptions?.onRowClick}
                rowsOptions={{ showNumbers: otherOptions?.showNumbers }}
              />
            )}
          </div>
        </TableStyles>
      )}

      {rows.isLoading && (
        <div data-testid='loading'>{tbodyOptions?.renderLoading?.()}</div>
      )}

      {rows.error && (
        <div data-testid='error'>{tbodyOptions?.renderError?.(rows.error)}</div>
      )}
    </div>
  )
}
