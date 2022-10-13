import React from 'react'
import styles from "./DisplayName.module.css"

interface Props {
    name: string;
}

const DisplayName: React.FC<React.PropsWithChildren<Props>> = ({ name }) => {
  return (
    <div data-testid={`DisplayName-${name}`} className={styles.container}>{name}</div>
  )
}

export default DisplayName