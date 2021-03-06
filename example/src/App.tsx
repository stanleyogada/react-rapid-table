import React from 'react'
import { Table, useRows, useThead, TableThemeProvider } from 'react-rapid-table'
import type { TRow, TSortByTHeadColumnId } from 'react-rapid-table'
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
        tbodyOptions={{
          onRowClick: (row: TRow) => console.log(row.name + ' row clicked')
        }}
        otherOptions={{
          // showNumbers: true, TODO: fix grid column (messed up layout)
          actionColumn: {
            renderTheadCell: (row: TRow) => (
              <p onClick={() => alert(JSON.stringify(row))}>action</p>
            ),
            renderTbodyCell: (row: TRow) => (
              <button onClick={() => alert(row.id)}>more</button>
            )
            // columnWidth: '50px'
          }
        }}
      />

      <TableThemeProvider
        styles={{
          cell: { background: 'red' },
          table: { background: '#eee' },
          thead: { background: '#444', color: '#fff' }
        }}
      >
        <Table
          columns={[{ id: 'name' }, { id: 'age' }]}
          rows={{
            data: [
              { id: '1', name: 'beca', age: 10 },
              { id: '2', name: 'adam', age: 30 },
              { id: '3', name: 'cup', age: 3 }
            ]
          }}
        />
        <Table
          columns={[{ id: 'name' }, { id: 'age' }]}
          rows={{
            data: [
              { id: '1', name: 'beca', age: 10 },
              { id: '2', name: 'adam', age: 30 },
              { id: '3', name: 'cup', age: 3 }
            ]
          }}
        />
      </TableThemeProvider>
    </div>
  )
}

export default App
