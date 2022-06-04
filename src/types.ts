export type TCell = {
  text: string | React.ReactNode | (() => React.ReactNode | string)
  testId?: string
}

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

export interface TTableRows {
  data?: TRow[] | null
  isLoading?: boolean
  error?: any // Any type can be thrown as error
}
export interface TTable {
  rows: TTableRows
  columns: TColumn[]
  rowsOptions?: TRowsOptions
}
