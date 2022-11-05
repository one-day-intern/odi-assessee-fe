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

interface NotificationViewerShortcutProps extends Props {
  notificationCount: number;
}

interface NotificationCountProps {
  children?: React.ReactNode;
  count: number;
}

const NotificationCount: React.FC<NotificationCountProps> = ({ count }) => {
  return (
    <motion.div
      key={count}
      initial={false}
      animate={{ y: [0, -10, 0, -5, 0] }}
      transition={count > 1 ? { duration: 0.75 } : undefined}
      exit={{ scale: 0 }}
      className={styles["notification-count"]}
    >
      {count > 9 ? "9+" : count}
    </motion.div>
  );
};

export const NotificationViewerShortcut: React.FC<
  NotificationViewerShortcutProps
> = ({ onClick, opened, notificationCount }) => {
  return (
    <motion.button
      className={`${styles["taskbar-shortcut"]} ${
        styles["notification-viewer-shortcut"]
      } ${opened ? styles.hovered : ""}`}
      data-testid="NotificationViewerShortcut"
      title="notification-viewer-shortcut"
      type="button"
    >
      <motion.div
        className="icon"
        onMouseDown={(e) => e.stopPropagation()}
        onTap={onClick}
        style={{ maxHeight: 32 }}
        whileTap={{ scale: 0.8 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 46 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.7199 22.8516L11.2603 24.1272C11.5574 23.7685 11.7199 23.3174 11.7199 22.8516H9.7199ZM36.2801 22.8516H34.2801C34.2801 23.3174 34.4426 23.7685 34.7397 24.1272L36.2801 22.8516ZM3.08784 30.8601L1.54746 29.5845L3.08784 30.8601ZM3.21916 31.4427L2.29089 33.2142H2.29089L3.21916 31.4427ZM42.9122 30.8601L44.4525 29.5845L42.9122 30.8601ZM42.7808 31.4427L43.7091 33.2142L42.7808 31.4427ZM4.62822 32.1358L11.2603 24.1272L8.17952 21.576L1.54746 29.5845L4.62822 32.1358ZM11.7199 22.8516V18.1453H7.7199V22.8516H11.7199ZM34.2801 18.1453V22.8516H38.2801V18.1453H34.2801ZM34.7397 24.1272L41.3718 32.1358L44.4525 29.5845L37.8205 21.576L34.7397 24.1272ZM1.54746 29.5845C0.515782 30.8303 1.02582 32.5513 2.29089 33.2142L4.14742 29.6711C4.95714 30.0954 5.34425 31.2711 4.62822 32.1358L1.54746 29.5845ZM41.3718 32.1358C40.6557 31.2711 41.0429 30.0954 41.8526 29.6711L43.7091 33.2142C44.9742 32.5513 45.4842 30.8303 44.4525 29.5845L41.3718 32.1358ZM41.8526 29.6711C30.197 35.7785 15.803 35.7785 4.14742 29.6711L2.29089 33.2142C15.1092 39.9308 30.8908 39.9308 43.7091 33.2142L41.8526 29.6711ZM38.2801 18.1453C38.2801 10.2164 31.2479 4.11803 23 4.11803V8.11803C29.4209 8.11803 34.2801 12.7892 34.2801 18.1453H38.2801ZM11.7199 18.1453C11.7199 12.7892 16.5791 8.11803 23 8.11803V4.11803C14.7521 4.11803 7.7199 10.2164 7.7199 18.1453H11.7199ZM28.5062 36.8398C28.5062 37.8779 28.0857 38.5644 27.3484 39.0683C26.5293 39.6279 25.233 40 23.5774 40V44C25.7484 44 27.9165 43.5248 29.6052 42.3708C31.3756 41.1609 32.5062 39.2674 32.5062 36.8398H28.5062ZM23.5774 40C21.9217 40 20.6255 39.6279 19.8065 39.0683C19.0692 38.5644 18.6487 37.8779 18.6487 36.8398H14.6487C14.6487 39.2674 15.7792 41.1609 17.5496 42.3708C19.2383 43.5248 21.4064 44 23.5774 44V40ZM32.5062 36.8398V35.794H28.5062V36.8398H32.5062ZM18.6487 36.8398V35.794H14.6487V36.8398H18.6487ZM28.1757 4.35316C28.1757 1.76712 25.9259 0 23.5774 0V4C23.8048 4 23.9742 4.08301 24.0721 4.17163C24.1667 4.25733 24.1757 4.32375 24.1757 4.35316H28.1757ZM23.5774 0C21.2289 0 18.9791 1.76712 18.9791 4.35316H22.9791C22.9791 4.32375 22.9881 4.25733 23.0827 4.17163C23.1805 4.08301 23.35 4 23.5774 4V0ZM24.1757 4.35316V6.11803H28.1757V4.35316H24.1757ZM18.9791 4.35316V6.11803H22.9791V4.35316H18.9791Z"
            fill="#3D65D8"
          />
        </svg>
      </motion.div>
      <AnimatePresence>
        {notificationCount !== 0 && <NotificationCount count={notificationCount} />}
      </AnimatePresence>
    </motion.button>
  );
};

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
        className="icon"
        onTap={onClick}
        style={{ maxHeight: 32 }}
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
