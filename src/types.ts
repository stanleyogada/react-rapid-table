export type TCell = {
  text: string | number | React.ReactNode
  testId?: string
  onClick?: (id: number | string) => void
  styles?: React.CSSProperties
}

export type TColumn = {
  id: number | string
  renderTbodyCell?: (cellValue: any) => string | number | React.ReactNode
  minFractionOrWidth?: string
  maxFractionOrWidth?: string
}

export type TRow = {
  id: number | string
  [key: string]: any
}

export type TRowsOptions = {
  showNumbers?: boolean | ((rowsNumber: number) => any)
  renderError?: (error: any) => string | number | React.ReactNode
  renderLoading?: () => string | number | React.ReactNode
  onRowClick?: (row: TRow) => void
}

export interface TTableRows {
  data?: TRow[] | null
  isLoading?: boolean
  error?: any // Any type can be thrown as error
}

export type TOtherOptions = {
  actionColumn?: {
    renderTheadCell?: (row: TRow) => string | number | React.ReactNode
    renderTbodyCell: (row: TRow) => string | number | React.ReactNode
    columnWidth?: string
  }
  showNumbers?: boolean | ((rowsNumber: number) => any)
}
export interface TTable {
  id?: string
  rows: TTableRows
  columns: TColumn[]
  tbodyOptions?: TRowsOptions
  theadOptions?: {
    renderTheadCell?: (
      cellValue: string | number,
      sortByTHeadColumnId?: TSortByTHeadColumnId
    ) => React.ReactNode | string | number
  }
  otherOptions?: TOtherOptions
}

export type TSortByTHeadColumnId = {
  id?: string | number | null
  direction: 'asc' | 'desc' | null
}

export interface TTHead {
  columns: TColumn[]
  onCellClick?: (id: string | number) => void
  sortByTHeadColumnId?: TSortByTHeadColumnId
  renderTheadCell?: (
    cellValue: string | number,
    sortByTHeadColumnId?: TSortByTHeadColumnId
  ) => string | number | React.ReactNode
  renderActionCell?: (row: TRow) => string | number | React.ReactNode
  actionCellWidth?: string
  styles?: React.CSSProperties
  cellStyles?: React.CSSProperties
}

export type TTableThemeProviderPropsStyles = {
  table?: React.CSSProperties
  thead?: React.CSSProperties
  tbody?: React.CSSProperties
  cell?: React.CSSProperties
}

export type TTableThemeProviderProps = {
  children?: React.ReactNode
  styles?: TTableThemeProviderPropsStyles
}
