import React from "react";
import styles from "./Taskbar.module.css";
import TaskbarShortcut from "./TaskbarShortcut";
import { motion } from "framer-motion"


interface Props {
  children?: React.ReactNode;
  virtualDesktop: VirtualDesktop;
  height: number;
}

const Taskbar: React.FC<Props> = ({ virtualDesktop, height }) => {
  return (
    <motion.div data-testid="MainTaskbar" className={`${styles.taskbar}`} style={{ height: height }}>
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
    </motion.div>
  );
};

export default Taskbar;
