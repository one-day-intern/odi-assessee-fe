import React from "react";
import styles from "./NotificationViewer.module.css";
import Notification from "./Notification/index";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  virtualDesktop: VirtualDesktop;
  taskbarHeight: number;
  notifications: AssesseeNotification[];
  onNotificationClose: (
    notification: AssesseeNotification,
    closeViewer: boolean
  ) => void;
}

export const compareNotificationPriority = (
  a: AssesseeNotification,
  b: AssesseeNotification
) => {
  // -1 means a precedes b
  if (a.priority === "high" && b.priority === "normal") {
    return -1;
  }
  if (a.priority === "high" && b.priority === "low") {
    return -1;
  }
  if (a.priority === "normal" && b.priority === "low") {
    return -1;
  }
  // else the priority is equal
  return 0;
};

const NotificationViewer: React.FC<Props> = ({
  virtualDesktop,
  taskbarHeight,
  notifications,
  onNotificationClose,
}) => {
  const sortedNotifications = notifications.sort(compareNotificationPriority);
  return (
    <motion.div
      data-testid="NotificationViewer"
      onMouseDown={(e) => e.stopPropagation()}
      style={{ height: `calc(100vh - ${taskbarHeight}px)` }}
      className={styles["notification-viewer"]}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", ease: "easeOut" }}
    >
      <AnimatePresence initial={false}>
        {sortedNotifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onNotificationClose={() => onNotificationClose(notification, false)}
            onClick={(notification) => {
              const app = virtualDesktop.openedApps.find(
                (app) => app.appId === notification.app.appId
              );
              if (!app) {
                virtualDesktop.openApp(notification.app);
              } else if (app.minimized) {
                virtualDesktop.toggleMinimize(app, false);
              }
              if (app) {
                virtualDesktop.focusApp(app);
              }
              onNotificationClose(notification, true);
            }}
          />
        ))}
        {!notifications.length && (
          <h1 className={styles["empty-header"]}>
            You have no new notifications.
          </h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationViewer;
