import { TTableRows } from './../types'
import * as React from 'react'

export const useRows = (): {
  rows: TTableRows
  handleGetRowsData: (
    fetcher: (...args: any[]) => any,
    options?: { fetcherArgs?: any[]; dataMapper?: (data: any[]) => any[] }
  ) => void
} => {
  const [rows, setRows] = React.useState<TTableRows>({
    data: [{ id: '1', name: 'John', age: '20' }],
    isLoading: false,
    error: null
  })

  const handleGetRowsData = React.useCallback(
    async (
      fetcher: (...args: any[]) => any,
      options?: { fetcherArgs?: any[]; dataMapper?: (data: any[]) => any[] }
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
