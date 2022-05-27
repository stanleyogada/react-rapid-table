export type TColumn = {
  id: number | string
  renderCell?: (cellData: any) => React.ReactNode | string
}
export type TRow = {
  id: number | string
  [key: string]: any
}

export type TRowsOptions = {
  showNumbers?: boolean
}
