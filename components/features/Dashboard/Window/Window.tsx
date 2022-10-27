import React, { useEffect, useRef, useState } from "react";
import styles from "./Window.module.css";
import { motion } from "framer-motion";
import FullscreenShadow from "./FullscreenShadow";
import DashboardAPIProvider from "@context/Dashboard/DashboardAPIContext";
import Draggable from "react-draggable";
import WindowActions from "./WindowActions";
import Resizers from "./Resizers";

interface Props {
  children?: React.ReactNode;
  fullscreenParentRef: React.RefObject<HTMLDivElement>;
  onClose?: (app: Application) => void;
  onFocus?: (app: Application) => void;
  onNotification: (
    app: Application,
    notification: DashboardNotification
  ) => void;
  onUpdatePos: (app: Application, pos: { x: number; y: number }) => void;
  onUpdateSize: (
    app: Application,
    size: { width: number; height: number }
  ) => void;
  toggleFullscreen: (app: Application, fullscreen: boolean) => void;
  toggleMinimize: (app: Application, minimize: boolean) => void;
  app: Application;
}

const Window: React.FC<Props> = ({
  app,
  fullscreenParentRef,
  onClose,
  onFocus,
  onNotification,
  onUpdatePos,
  onUpdateSize,
  toggleFullscreen,
  toggleMinimize,
}) => {
  // it is important that this should NEVER be unmounted
  // this window needs to preserve Application state across
  // all animations
  const Application = app.app;

  const nodeRef = useRef<HTMLDivElement>(null);
  const [windowReady, setWindowReady] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [mouseIntersectingWithTop, setMouseIntersectingWithTop] =
    useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const snapToCursor = (e: MouseEvent) => {
      if (dragging && app.fullscreen) {
        const dragBias = 10;
        const capturedMousePos = mousePosition;
        if (
          Math.abs(e.clientY - capturedMousePos.y!) >= dragBias ||
          Math.abs(e.clientX - capturedMousePos.x!) >= dragBias
        ) {
          const mouseToFullscreenRatio = e.clientX / window.innerWidth;

          toggleFullscreen(app, false);
          onUpdatePos(app, {
            x: e.clientX - app.width * mouseToFullscreenRatio,
            y: e.clientY - 15,
          });
        }
      }
    };

    window.addEventListener("mousemove", snapToCursor);

    return () => window.removeEventListener("mousemove", snapToCursor);
  }, [dragging, mousePosition, app, onUpdatePos, toggleFullscreen]);

  useEffect(() => {
    const fullscreenShadow = (e: MouseEvent) => {
      if (dragging) {
        if (e.clientY <= 0 && !mouseIntersectingWithTop) {
          setMousePosition({ x: e.clientX, y: e.clientY });
          setMouseIntersectingWithTop(true);
        } else if (mouseIntersectingWithTop && e.clientY >= 0) {
          setMouseIntersectingWithTop(false);
        }
      }
    };

    const killShadow = (e: MouseEvent) => setMouseIntersectingWithTop(false);

    window.addEventListener("mousemove", fullscreenShadow);
    window.addEventListener("mouseup", killShadow);
    window.addEventListener("mouseout", killShadow);

    return () => {
      window.removeEventListener("mousemove", fullscreenShadow);
      window.removeEventListener("mouseup", killShadow);
      window.removeEventListener("mouseout", killShadow);
    };
  }, [dragging, mouseIntersectingWithTop]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMobileMode(true);
      } else if (window.innerWidth > 1024) {
        setMobileMode(false);
      }
    };
    if (window.innerWidth <= 1024) {
      setMobileMode(true);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (nodeRef.current) {
      setWindowReady(true);
    }
  }, []);

  const className = `${styles["odi-window"]}${
    app.fullscreen || mobileMode ? " " + styles["odi-window-fullscreen"] : ""
  }${isResizing ? " " + styles["no-transition"] : ""}`;

  const currentPos =
    app.fullscreen || mobileMode
      ? {
          x: 0,
          y: app.minimized ? window.innerHeight : 0,
        }
      : {
          x: app.currentX,
          y: app.minimized ? window.innerHeight + app.currentY : app.currentY,
        };

  return (
    // @ts-ignore
    <Draggable
      handle={`.${styles["window__head"]}`}
      defaultClassName={className}
      defaultClassNameDragging={styles["no-transition"]}
      position={currentPos}
      onStart={() => setDragging(true)}
      onStop={(_, data) => {
        if (!app.fullscreen) onUpdatePos(app, { x: data.x, y: data.y });
        if (dragging) {
          setDragging(false);
          if (mouseIntersectingWithTop) {
            toggleFullscreen(app, true);
          }
        }
      }}
      nodeRef={nodeRef}
    >
      <motion.div
        data-testid={`Window-${app.appId}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: app.width,
          height: app.height,
          zIndex: app.zIndex,
        }}
        ref={nodeRef}
        className={styles.window}
      >
        <div
          onMouseDown={(e) => onFocus && onFocus(app)}
          data-testid="window-head"
          className={styles["window__head"]}
        >
          <WindowActions
            app={app}
            mobileMode={mobileMode}
            toggleFullscreen={toggleFullscreen}
            toggleMinimize={toggleMinimize}
            onClose={onClose}
            onFocus={onFocus}
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onFocus && onFocus(app);
          }}
          className={styles["window__body"]}
        >
          {windowReady && (
            <DashboardAPIProvider
              parentRef={nodeRef}
              onPushNotification={(notification) =>
                onNotification(app, notification)
              }
            >
              <Application />
            </DashboardAPIProvider>
          )}
        </div>
        <FullscreenShadow
          shouldRender={mouseIntersectingWithTop}
          zIndex={app.zIndex}
          bounds={fullscreenParentRef.current!.getBoundingClientRect()}
          startHeight={app.height}
          startWidth={app.width}
          startX={mousePosition.x!}
          startY={0}
        />
        {!(app.fullscreen || mobileMode) && (
          <Resizers
            parentRef={nodeRef}
            onResizeStart={() => onFocus && onFocus(app)}
            onResizeEnd={(data) => {
              onUpdatePos(app, { x: data.x!, y: data.y! });
              onUpdateSize(app, { width: data.width!, height: data.height! });
            }}
            isResizing={isResizing}
            setIsResizing={setIsResizing}
            minHeight={100}
            minWidth={32}
          />
        )}
      </motion.div>
    </Draggable>
  );
};

export default Window;
