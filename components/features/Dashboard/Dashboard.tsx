import React, { useRef, useState } from "react";
import useVirtualDesktop from "@hooks/Dashboard/useVirtualDesktop";
import Screen from "./Screen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import styles from "./Dashboard.module.css";
import NotificationViewer from "./NotificationViewer";
import { AnimatePresence, MotionConfig } from "framer-motion";

const Dashboard = () => {
  const TASKBAR_HEIGHT = 50;
  const fullscreenBoundRef = useRef<HTMLDivElement>(null);
  const virtualDesktop = useVirtualDesktop();
  const [isNotificationViewerOpened, setIsNotificationViewerOpened] =
    useState(false);
  const [notifications, setNotifications] = useState<AssesseeNotification[]>(
    []
  );

  const onNotification = (
    app: Application,
    notification: DashboardNotification
  ) => {
    if (
      !notifications.find(
        (_notification) =>
          _notification.id === `${notification.id}-${app.appId}`
      )
    ) {
      setNotifications((prev) => [
        ...prev,
        { app: app, ...notification, id: `${notification.id}-${app.appId}` },
      ]);
    }
  };

  const onNotificationClose = (notification: AssesseeNotification) => {
    setNotifications((prev) =>
      prev.filter((_notification) => _notification.id !== notification.id)
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <Screen onMouseDown={(e) => setIsNotificationViewerOpened(false)}>
        <div
          data-testid="FullscreenBounds"
          ref={fullscreenBoundRef}
          className={styles["screen__fullscreen--bounds"]}
          style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
        >
          <AnimatePresence initial={false}>
            {virtualDesktop.openedApps.map((app) => (
              <Window
                key={app.appId}
                app={app}
                fullScreenBounds={styles["screen__fullscreen--bounds"]}
                onFocus={(_app) => {
                  virtualDesktop.focusApp(_app);
                  setIsNotificationViewerOpened(false);
                }}
                onClose={(_app) => virtualDesktop.closeApp(_app)}
                onNotification={(_app, notification) =>
                  onNotification(_app, notification)
                }
                onUpdatePos={(_app, pos) =>
                  virtualDesktop.updateAppPosition(_app, pos)
                }
                onUpdateSize={(_app, size) =>
                  virtualDesktop.updateAppSize(_app, size)
                }
                toggleFullscreen={(_app, fullscreen) =>
                  virtualDesktop.toggleFullscreen(_app, fullscreen)
                }
                toggleMinimize={(_app, minimize) =>
                  virtualDesktop.toggleMinimize(_app, minimize)
                }
              />
            ))}
          </AnimatePresence>
        </div>
        <Taskbar
          height={TASKBAR_HEIGHT}
          isNotificationViewerOpen={isNotificationViewerOpened}
          notificationCount={notifications.length}
          onNotificationViewerOpen={() =>
            setIsNotificationViewerOpened(!isNotificationViewerOpened)
          }
          virtualDesktop={virtualDesktop}
        />
        <AnimatePresence>
          {isNotificationViewerOpened && (
            <NotificationViewer
              virtualDesktop={virtualDesktop}
              onNotificationClose={(notification, closeViewer) => {
                onNotificationClose(notification);
                if (closeViewer) {
                  setIsNotificationViewerOpened(false);
                }
              }}
              notifications={notifications}
              taskbarHeight={TASKBAR_HEIGHT}
            />
          )}
        </AnimatePresence>
      </Screen>
    </MotionConfig>
  );
};

export default Dashboard;
