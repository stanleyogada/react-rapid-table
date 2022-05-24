import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const Table = ({ text }: Props) => {
  return <div className={styles.table}></div>
}
