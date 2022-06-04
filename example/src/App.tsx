import React from 'react'

import { Table } from 'react-rapid-table'
import type { TTableRows } from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'

const App = () => {
  const [rows] = React.useState<TTableRows>({
    data: null,
    isLoading: false,
    error: null
  })

  return (
    <Table
      columns={[{ id: 'name' }]}
      rows={rows}

      // rowsOptions={{
      //   renderLoading: () => <div>Loading...</div>,
      //   renderError: (error: Error) => <div>Error: {error.message}</div>
      // }}
    />
  )
}

export default App
