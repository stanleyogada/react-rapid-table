import * as React from 'react'
import { TTableThemeProviderProps } from '../../types'
import { TableThemeContext } from './context/TableThemeContext'

export const TableThemeProvider: React.FC<TTableThemeProviderProps> = ({
  children,
  styles
}) => {
  return (
    <TableThemeContext.Provider value={{ styles }}>
      {children}
    </TableThemeContext.Provider>
  )
}
