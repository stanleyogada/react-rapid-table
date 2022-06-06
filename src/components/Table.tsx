import * as React from 'react'
import Rows from './Rows/Rows'
import styles from './styles.module.css'
import THead from './THead/THead'
import { TRow, TSortByTHeadColumnId, TTable } from '../types'

export const Table = ({ id, columns, rows, rowsOptions }: TTable) => {
  const [rowsData, setRowsData] = React.useState<undefined | null | TRow[]>(
    rows.data
  )

  const [sortByTHeadColumnId, setSortByTHeadColumnId] =
    React.useState<TSortByTHeadColumnId>({
      // id: rowsOptions?.sortBy?.id, TODO: good suggestion by COPILOT: ADD `DEFAULT` IN `ROWS_OPTIONS`
      // direction: rowsOptions?.sortBy?.direction TODO: good suggestion by COPILOT: ADD `DEFAULT` IN `ROWS_OPTIONS`
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
      console.log(sortByTHeadColumnId)

      if (sortByTHeadColumnId.direction == null && rows.data && mounted)
        //reset sort to original rowsData
        return setRowsData(rows.data)

      const newRowsData = [...(rowsData || [])]
      newRowsData.sort((a, b) => {
        const aValue = a[sortByTHeadColumnId.id as string]
        const bValue = b[sortByTHeadColumnId.id as string]

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
        <div className={styles.table} data-testid='table'>
          <THead
            columns={columns}
            onCellClick={handleSortByTHeadColumn}
            sortByTHeadColumnId={sortByTHeadColumnId}
          />

          <div data-testid='tbody'>
            {rowsData && <Rows data={rowsData} columns={columns} />}
          </div>
        </div>
      )}

      {rows.isLoading && (
        <div data-testid='loading'>{rowsOptions?.renderLoading?.()}</div>
      )}

      {rows.error && (
        <div data-testid='error'>{rowsOptions?.renderError?.(rows.error)}</div>
      )}
    </div>
  )
}
