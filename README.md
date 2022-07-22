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

## License

MIT © [stanleyogada](https://github.com/stanleyogada)
