import React from "react";
import styles from "./TaskbarShortcut.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  onDoubleClick?: () => void;
  opened?: boolean;
  focused?: boolean;
}

const TaskbarShortcut: React.FC<Props> = ({
  children,
  onClick,
  focused,
  opened,
}) => {
  return (
    <motion.button
      className={`${styles["taskbar-shortcut"]} ${
        focused ? styles.hovered : ""
      }`}
      data-testid="Shortcut"
      title="taskbar-shortcut"
      type="button"
    >
      <motion.div
        id="icon"
        onTap={onClick}
        style={{ height: 30, width: 30 }}
        whileTap={{ scale: 0.8 }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {opened && (
          <motion.div
            data-testid="ShortcutIconOverlay"
            style={{ backgroundColor: focused ? "rgb(37, 150, 190)" : "grey" }}
            animate={{ width: focused ? 22 : 8 }}
            className={styles["open-dot"]}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default TaskbarShortcut;
