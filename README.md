# React-Rapid-Table

> A simple and small yet robust API table UI package

[![NPM](https://img.shields.io/npm/v/react-rapid-table.svg)](https://www.npmjs.com/package/react-rapid-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rapid-table
```

## Usage

```tsx
import React, { Component } from 'react'

import { Table } from 'react-rapid-table'
import 'react-rapid-table/dist/index.css'

class App extends Component {
  render() {
    return (
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
    )
  }
}
```

## API

### Components

#### Table

| Prop          |                                                                    Type                                                                    | Description                                 |
| ------------- | :----------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------- |
| id?           |                                                                   string                                                                   | HTML id attribute for the component wrapper |
| columns       |                                                                 TColumn[]                                                                  | n/a                                         |
| rows          |                                                                 TTableRows                                                                 | n/a                                         |
| tbodyOptions  |                                                                TRowsOptions                                                                | n/a                                         |
| otherOptions  |                                                               TOtherOptions                                                                | n/a                                         |
| theadOptions? | { `renderTheadCell?`: ( cellValue: string \| number, sortByTHeadColumnId?: TSortByTHeadColumnId ) => React.ReactNode \| string \| number } | n/a                                         |

#### TableThemeProvider

| Prop    |              Type              | Description |
| ------- | :----------------------------: | ----------- |
| chidren |        React.ReactNode         | n/a         |
| styles? | TTableThemeProviderPropsStyles | n/a         |

### Hooks

#### useRows

#### useThead

### Types

#### TColumn

| Prop                |                          Type                           | Description |
| ------------------- | :-----------------------------------------------------: | ----------- |
| id                  |                    number \| string                     | n/a         |
| renderTbodyCell?    | (cellValue: any) => string \| number \| React.ReactNode | n/a         |
| minFractionOrWidth? |                         string                          | n/a         |
| maxFractionOrWidth? |                         string                          | n/a         |

#### TTableRows

| Prop       |  Type   | Description            |
| ---------- | :-----: | ---------------------- |
| data?      | TRow[]  | n/a                    |
| isLoading? | boolean | n/a                    |
| error?     |   any   | Any Error value thrown |

#### TRow

| Prop          |       Type       | Description |
| ------------- | :--------------: | ----------- |
| id            | number \| string | n/a         |
| [key: string] |       any        | ...rest     |

#### TSortByTHeadColumnId

| Prop      |           Type           | Description |
| --------- | :----------------------: | ----------- |
| id?       | string \| number \| null | n/a         |
| direction | 'asc' \| 'desc' \| null  | n/a         |

#### TRowsOptions

| Prop           |                        Type                         | Description |
| -------------- | :-------------------------------------------------: | ----------- |
| showNumbers?   |      boolean \| ((rowsNumber: number) => any)       | n/a         |
| renderError?   | (error: any) => string \| number \| React.ReactNode | n/a         |
| renderLoading? |      () => string \| number \| React.ReactNode      | n/a         |
| onRowClick?    |                 (row: TRow) => void                 | n/a         |

#### TOtherOptions

| Prop          |                                                                                   Type                                                                                    | Description |
| ------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------- |
| actionColumn? | { `renderTheadCell?`: (row: TRow) => string \| number \| React.ReactNode; `renderTbodyCell`: (row: TRow) => string \| number \| React.ReactNode; `columnWidth?`: string } | n/a         |
| showNumbers?  |                                                                 boolean \| ((rowsNumber: number) => any)                                                                  | n/a         |

#### TTableThemeProviderPropsStyles

| Prop   |         Type         | Description |
| ------ | :------------------: | ----------- |
| table? | React.CSSProperties  | n/a         |
| thead? | TReact.CSSProperties | n/a         |
| tbody? | RReact.CSSProperties | n/a         |
| cell?  | React.CSSProperties  | n/a         |

## License

MIT © [stanleyogada](https://github.com/stanleyogada)
