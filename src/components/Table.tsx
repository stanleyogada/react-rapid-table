import * as React from 'react'
import Rows from './Rows/Rows'
import styles from './styles.module.css'
import THead from './THead/THead'
import { TTable } from './types'

export const Table = ({ columns, rows }: TTable) => {
  return (
    <>
      {rows.data && (
        <div className={styles.table} data-testid='table'>
          <THead columns={columns} />

          <div data-testid='tbody'>
            {rows.data && <Rows data={rows.data} columns={columns} />}
          </div>
        </div>
      )}

      {rows.isLoading && (
        <div data-testid='loading'>{rows.options?.renderLoading?.()}</div>
      )}

      {rows.error && (
        <div data-testid='error'>{rows.options?.renderError?.(rows.error)}</div>
      )}
    </>
  )
}
