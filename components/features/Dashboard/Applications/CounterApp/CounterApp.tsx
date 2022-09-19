import React, { useState } from 'react'
import styles from './CounterApp.module.css';

const CounterApp = () => {
  const [count, setCount] = useState(1);


  return (
    <main className={styles.main}>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      </main>
  )
}

export default CounterApp