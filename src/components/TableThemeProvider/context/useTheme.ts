import * as React from 'react'
import { TTableThemeProviderPropsStyles } from '../../../types'
import { TableThemeContext } from './TableThemeContext'

export const useTheme = (): {
  styles: TTableThemeProviderPropsStyles
} => {
  const context = React.useContext(TableThemeContext)

  return context
}
