import React from 'react'
import { Table, useRows } from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'
import { getAllUsers, TUser } from './services/user'

const App = () => {
  const { rows, handleGetRowsData } = useRows<TUser>()

  React.useEffect(() => {
    handleGetRowsData(getAllUsers, {
      fetcherArgs: [1, 10],
      dataMapper: (data: TUser[]) =>
        data.map((user) => ({
          id: user.id,
          name: `(${user.username}) ${user.name}`,
          username: user.username
        }))
    })
  }, [handleGetRowsData])

  return (
    <div>
      <Table
        columns={[
          { id: 'name', renderCell: (name: string) => <h2>{name}</h2> }
        ]}
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
