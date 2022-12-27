import React from "react";
import styles from "./Taskbar.module.css";
import TaskbarShortcut, { NotificationViewerShortcut } from "./TaskbarShortcut";
import { TiTabsOutline } from "react-icons/ti";
import { AiOutlineHome } from "react-icons/ai"
import { motion } from "framer-motion";
import DashboardEvent from "../DashboardEvents";
import { useRouter } from "next/router";

interface Props {
  children?: React.ReactNode;
  isNotificationViewerOpen: boolean;
  notificationCount: number;
  onNotificationViewerOpen: () => void;
  virtualDesktop: VirtualDesktop;
  height: number;
}

const Taskbar: React.FC<Props> = ({
  virtualDesktop,
  onNotificationViewerOpen,
  isNotificationViewerOpen,
  notificationCount,
  height,
}) => {
  const router = useRouter();
  return (
    <motion.div
      data-testid="MainTaskbar"
      className={`${styles.taskbar}`}
      style={{ height: height }}
    >
      <NotificationViewerShortcut
        opened={isNotificationViewerOpen}
        notificationCount={notificationCount}
        onClick={() => onNotificationViewerOpen()}
      />
      <TaskbarShortcut
        testid="DashboardBack"
        onClick={() => router.replace('/dashboard')}
      >
        <AiOutlineHome size={34} color="var(--primary)" />
      </TaskbarShortcut>
      {virtualDesktop.applications.map((app) => {
        const appInMemory = virtualDesktop.openedApps.find(
          (_app) => _app.appId === app.appId
        );
        const Icon = app.icon;
        return (
          <TaskbarShortcut
            key={app.appId}
            onClick={() => {
              if (appInMemory !== undefined) {
                virtualDesktop.focusApp(appInMemory);
                if (appInMemory.minimized) {
                  virtualDesktop.toggleMinimize(appInMemory, false);
                }
              } else {
                virtualDesktop.openApp(app);
              }
            }}
            opened={appInMemory !== undefined}
            focused={appInMemory?.zIndex === virtualDesktop.openedApps.length}
          >
            <Icon width={32} height={32} />
          </TaskbarShortcut>
        );
      })}
      <TaskbarShortcut
        testid="RevealWindows"
        onClick={() => dispatchEvent(new Event(DashboardEvent.REVEAL_WINDOWS))}
        style={{ position: "absolute", right: 0 }}
      >
        <TiTabsOutline size={32} color="var(--secondary)" />
      </TaskbarShortcut>
    </motion.div>
  );
};

export default Taskbar;
