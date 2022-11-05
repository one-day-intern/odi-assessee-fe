import React from 'react'

import styles from "./Backdrop.module.css";
import { BackdropProps } from "./BackdropProps";

const Backdrop = ({ children } : BackdropProps) => {
  return (
    <div className={ styles["backdrop"] } data-testid="backdrop">
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__content"]}>
            { children }
        </div>
    </div>
  )
}

export { Backdrop }