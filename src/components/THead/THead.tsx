import * as React from 'react'
import Rows from '../Rows/Rows'
import { TColumn, TRow } from '../../types'

interface TTHead {
  columns: TColumn[]
}

const THead: React.FC<TTHead> = ({ columns }) => {
  const rowsData: TRow[] = [{ id: 1 }]

  columns = columns.map((col) => {
    rowsData[0] = { ...rowsData[0], [col.id]: col.id }

    return { ...col, renderCell: undefined }
  })

  return (
    <div data-testid='thead'>
      <Rows data={rowsData} columns={columns} />
    </div>
  )
}

export default THead
