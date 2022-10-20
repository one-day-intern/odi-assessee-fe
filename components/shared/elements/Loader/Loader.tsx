import React from 'react'
import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <span data-testid="loader" className={styles["loader"]}></span>
  )
}

export {Loader}