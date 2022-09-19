import React from 'react'
import styles from './TaskbarShortcut.module.css'
import { motion } from 'framer-motion'

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

const TaskbarShortcut: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={`${styles["taskbar-shortcut"]}`} title="taskbar-shortcut" type='button'>
      <motion.div onTap={onClick} style={{ height: 34, width: 34, backgroundColor: 'white' }} whileTap={{ scale: 0.8 }}>
        {children}
      </motion.div>
    </button>
  )
}

export default TaskbarShortcut