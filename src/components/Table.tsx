import * as React from 'react'
import Rows from './Rows/Rows'
import styles from './styles.module.css'
import THead from './THead/THead'
import { TTable } from '../types'

export const Table = ({ columns, rows, rowsOptions }: TTable) => {
  return (
    <React.Fragment>
      {rows.data && (
        <div className={styles.table} data-testid='table'>
          <THead columns={columns} />

          <div data-testid='tbody'>
            {rows.data && <Rows data={rows.data} columns={columns} />}
          </div>
        </div>
      )}

      {rows.isLoading && (
        <div data-testid='loading'>{rowsOptions?.renderLoading?.()}</div>
      )}

      {rows.error && (
        <div data-testid='error'>{rowsOptions?.renderError?.(rows.error)}</div>
      )}
    </React.Fragment>
  )
}
