import { TRow, TTableRows } from './../types'
import * as React from 'react'

export const useRows = <TResource extends TRow>(): {
  rows: TTableRows
  handleGetRowsData: (
    fetcher: (...args: any[]) => Promise<TResource[]>,
    options?: {
      fetcherArgs?: any[]
      dataMapper?: (data: TResource[]) => TResource[]
    }
  ) => void
} => {
  const [rows, setRows] = React.useState<TTableRows>({
    data: null,
    isLoading: false,
    error: null
  })

  const handleGetRowsData = React.useCallback(
    async (
      fetcher: (...args: any[]) => Promise<TResource[]>,
      options?: {
        fetcherArgs?: any[]
        dataMapper?: (data: TResource[]) => TResource[]
      }
    ) => {
      try {
        setRows((rows) => ({ ...rows, isLoading: true, error: null }))
        let data = await fetcher(...(options?.fetcherArgs || []))

        data = options?.dataMapper?.(data) || data

        setRows({ data, isLoading: false, error: null })
      } catch (error) {
        setRows((rows) => ({ ...rows, error, isLoading: false }))
      }
    },
    []
  )

  return {
    rows,
    handleGetRowsData
  }
}
