import React from "react";
import styles from "./Notification.module.css";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  notification: AssesseeNotification;
  onNotificationClose: () => void;
  onClick: (notification: AssesseeNotification) => void;
}

const Notification: React.FC<Props> = ({
  notification,
  onClick,
  onNotificationClose,
}) => {
  return (
    <motion.div
      data-testid={`Notification-${notification.id}`}
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={styles.notification}
      onClick={() => onClick(notification)}
    >
      <div className={styles["notification-header"]}>
        <div className={styles["notification-header__icon"]}>
          <notification.app.icon width={30} height={30} />
        </div>
        <h1 className={styles["notification-header__title"]}>
          {notification.app.appName}
        </h1>
      </div>
      <p className={styles["notification-body"]}>{notification.message}</p>
      <motion.button
        className={styles["notification-close"]}
        onTap={(e) => e.stopPropagation}
        onClick={(e) => {
          onNotificationClose();
          e.stopPropagation();
        }}
      >
        &times;
      </motion.button>
    </motion.div>
  );
};

export default Notification;
