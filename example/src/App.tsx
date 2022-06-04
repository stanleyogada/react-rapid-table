import React from 'react'
import { Table, useRows } from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'
import { getAllUsers } from './services/user'

const App = () => {
  const { rows, handleGetRowsData } = useRows()

  React.useEffect(() => {
    handleGetRowsData(getAllUsers, {
      fetcherArgs: [1, 10],
      dataMapper: (data) =>
        data.map((user) => ({
          id: user.id,
          name: `(${user.username}) ${user.name}`
        }))
    })
  }, [handleGetRowsData])

  return (
    <div>
      <Table
        columns={[{ id: 'name', renderCell: (name) => <h2>{name}</h2> }]}
        rows={rows}
        rowsOptions={{
          renderLoading: () => <div>Loading...</div>,
          renderError: (error: Error) => <div>Error: {error.message}</div>
        }}
      />
    </div>
  )
}

export default App
