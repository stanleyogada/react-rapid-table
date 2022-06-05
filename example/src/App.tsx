import React from 'react'
import { Table, useRows } from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'
import { getAllUsers, TUser } from './services/user'

const App = () => {
  const { rows, handleGetRowsData } = useRows<TUser>()

  const onGetRowsData = React.useCallback(
    () =>
      handleGetRowsData(getAllUsers, {
        fetcherArgs: [1, 10],
        dataMapper: (data) =>
          data.map((user) => ({
            id: user.id,
            name: `(${user.username}) ${user.name}`,
            username: user.username,
            email: user.email
          }))
      }),
    [handleGetRowsData]
  )

  React.useEffect(() => {
    onGetRowsData()
  }, [onGetRowsData])

  return (
    <div>
      <Table
        id='table-1'
        columns={[
          {
            id: 'name',
            renderCell: (name: string) => <h2>{name}</h2>,
            minFractionOrWidth: '200px'
          },
          {
            id: 'username'
            // minFractionOrWidth: '150px',
            // maxFractionOrWidth: '.8fr'
          },
          {
            id: 'email'
            // maxFractionOrWidth: '2fr'
          }
        ]}
        rows={rows}
        rowsOptions={{
          renderLoading: () => <div>Loading...</div>,
          renderError: (error: Error) => (
            <div>
              Error: {error.message}{' '}
              <button onClick={onGetRowsData}>Try again</button>
            </div>
          )
        }}
      />
    </div>
  )
}

export default App
