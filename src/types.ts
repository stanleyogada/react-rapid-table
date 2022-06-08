export type TCell = {
  text: string | React.ReactNode | (() => React.ReactNode | string)
  testId?: string
  onClick?: (id: number | string) => void
}

export type TColumn = {
  id: number | string
  renderCell?: (cellValue: any) => React.ReactNode | string
  minFractionOrWidth?: string
  maxFractionOrWidth?: string
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
  id?: string
  rows: TTableRows
  columns: TColumn[]
  rowsOptions?: TRowsOptions
}

export type TSortByTHeadColumnId = {
  id?: string | number | null
  direction: 'asc' | 'desc' | null
}

export interface TTHead {
  columns: TColumn[]
  onCellClick?: (id: string | number) => void
  sortByTHeadColumnId?: TSortByTHeadColumnId
  renderCustomCell?: (
    cellValue: any,
    sortByTHeadColumnId?: TSortByTHeadColumnId
  ) => React.ReactNode | string
}
