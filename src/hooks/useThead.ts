import { TSortByTHeadColumnId } from '../types'

export const useThead = (): {
  currentCellHasASortDirection: (
    cellValue: string | number,
    sortByTHeadColumnId?: TSortByTHeadColumnId
  ) => boolean
} => {
  const currentCellHasASortDirection = (
    cellValue: string | number,
    sortByTHeadColumnId?: TSortByTHeadColumnId
  ) =>
    sortByTHeadColumnId?.id === cellValue && sortByTHeadColumnId?.direction
      ? true
      : false

  return {
    currentCellHasASortDirection
  }
}
