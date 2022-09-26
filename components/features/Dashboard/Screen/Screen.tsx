import React from 'react'
import styles from './Screen.module.css'

interface Props {
    children?: React.ReactNode;
}

// this component handles desktop misc. logic (background, etc.)
const Screen: React.FC<Props> = ({ children }) => {
  return (
    <div data-testid="MainScreen" className={`${styles.screen}`}>
        {children}
    </div>
  )
}

export default Screen