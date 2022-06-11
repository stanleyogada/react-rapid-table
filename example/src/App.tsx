import React from 'react'
import {
  Table,
  TSortByTHeadColumnId,
  useRows,
  useThead
} from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'
import { getAllUsers, TUser } from './services/user'

const App = () => {
  const { rows, handleGetRowsData } = useRows<TUser>()
  const { currentCellHasASortDirection } = useThead()

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

  console.log(rows)

  return (
    <div>
      <Table
        id='table-1'
        columns={[
          {
            id: 'name',
            minFractionOrWidth: '200px',
            renderTbodyCell: (name: string) => <h2>{name}</h2>
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
        theadOptions={{
          renderTheadCell: (
            cellValue: string | number,
            sortByTHeadColumnId?: TSortByTHeadColumnId
          ) => (
            <h1>
              {cellValue}
              {currentCellHasASortDirection(cellValue, sortByTHeadColumnId) && (
                <span>{sortByTHeadColumnId?.direction}</span>
              )}
            </h1>
          )
        }}
        tbodyOptions={{
          renderLoading: () => <div>Loading...</div>,
          renderError: (error: Error) => (
            <div>
              Error: {error.message}{' '}
              <button onClick={onGetRowsData}>Try again</button>
            </div>
          )
        }}
      />

      <Table
        id='table-2'
        columns={[{ id: 'name' }, { id: 'age' }]}
        rows={{
          data: [
            { id: '1', name: 'beca', age: 10 },
            { id: '2', name: 'adam', age: 30 },
            { id: '3', name: 'cup', age: 3 }
          ]
        }}
        otherOptions={{
          actionColumn: {
            renderTheadCell: () => 'action',
            renderTbodyCell: () => <button>more</button>
          }
        }}
      />
    </div>
  )
}

export default App
