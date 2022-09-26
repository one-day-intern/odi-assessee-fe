import React, { useRef } from "react";
import useVirtualDesktop from "@hooks/Dashboard/useVirtualDesktop";
import Screen from "./Screen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import styles from "./Dashboard.module.css";
import { AnimatePresence, MotionConfig } from "framer-motion";

const Dashboard = () => {
  const TASKBAR_HEIGHT = 50;
  const fullscreenBoundRef = useRef<HTMLDivElement>(null);
  const virtualDesktop = useVirtualDesktop();

  return (
    <MotionConfig reducedMotion="user">
      <Screen>
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
                onFocus={(_app) => virtualDesktop.focusApp(_app)}
                onClose={(_app) => virtualDesktop.closeApp(_app)}
                onUpdatePos={(_app, pos) =>
                  virtualDesktop.updateAppPosition(_app, pos)
                }
                onUpdateSize={(_app, size) =>
                  virtualDesktop.updateAppSize(_app, size)
                }
                toggleFullscreen={(_app, fullscreen) =>
                  virtualDesktop.toggleFullscreen(_app, fullscreen)
                }
                toggleReveal={(_app, reveal) =>
                  virtualDesktop.toggleReveal(_app, reveal)
                }
                toggleMinimize={(_app, minimize) =>
                  virtualDesktop.toggleMinimize(_app, minimize)
                }
              />
            ))}
          </AnimatePresence>
        </div>
        <Taskbar height={TASKBAR_HEIGHT} virtualDesktop={virtualDesktop} />
      </Screen>
    </MotionConfig>
  );
};

export default Dashboard;
