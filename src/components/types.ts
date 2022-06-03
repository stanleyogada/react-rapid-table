export type TColumn = {
  id: number | string
  renderCell?: (cellData: any) => React.ReactNode | string
}
export type TRow = {
  id: number | string
  [key: string]: any
}

export type TRowsOptions = {
  showNumbers?: boolean | ((rowsNumber: number) => any)
  renderError?: (error: any) => any
  renderLoading?: () => any
}

export interface TTable {
  rows: {
    data?: TRow[] | null
    isLoading?: boolean
    error?: any // Any type can be trown as error
    options?: TRowsOptions
  }
  columns: TColumn[]
}
