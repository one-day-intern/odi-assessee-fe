import React, { useRef, useState, useEffect } from "react";
import styles from "./Window.module.css";
import { Rnd } from "react-rnd";
import { motion, Variants } from "framer-motion";
import FullscreenShadow from "./FullscreenShadow";
import useWindowStateManager from "@hooks/Dashboard/useWindowStateManager";
import useMouseScreenIntersection from "@hooks/Dashboard/useMouseScreenIntersection";
import DashboardAPIProvider from "@context/Dashboard/DashboardAPIContext";

interface Props {
  children?: React.ReactNode;
  fullScreenBounds: string;
  onClose?: (app: Application) => void;
  onFocus?: (app: Application) => void;
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
  fullScreenBounds,
  onClose,
  onFocus,
  onUpdatePos,
  onUpdateSize,
  toggleFullscreen,
  toggleMinimize,
}) => {
  const rndRef = useRef<React.ElementRef<typeof Rnd>>(null);
  // it is important that this should NEVER be unmounted
  // this window needs to preserve Application state across
  // all animations
  const Application = app.app;

  const {
    bounds,
    mobileMode,
    fullscreen,
    setMobileMode,
    setToNormalMode,
    setToOriginalSize,
    setToOriginalSizeMobile,
  } = useWindowStateManager(
    app,
    toggleFullscreen,
    fullScreenBounds,
    rndRef.current!
  );

  const { intersecting, mousePos, mouseDown } = useMouseScreenIntersection();
  const [dragging, setDragging] = useState(false);

  const topLeftMaximizeArrow: Variants = {
    hover: {
      x: -1,
      y: -1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.3,
      },
    },
  };

  const bottomRightMaximizeArrow: Variants = {
    hover: {
      x: 1,
      y: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.3,
      },
    },
  };

  // this is the reveal 'event' listener that would be fired from the taskbar
  useEffect(() => {
    const revealSelf = () => {
      if (bounds && !app.fullscreen) {
        const newX = (bounds.width - app.width) * 0.5;
        const newY = (bounds.height - app.height) * 0.5;
        onUpdatePos(app, {
          x: newX,
          y: newY,
        });
        rndRef.current?.updatePosition({
          x: newX,
          y: newY,
        });
      }
    };

    addEventListener("reveal-windows" as keyof WindowEventMap, revealSelf);

    return () =>
      removeEventListener("reveal-windows" as keyof WindowEventMap, revealSelf);
  }, [app, bounds, rndRef, onUpdatePos]);

  // this the resize event listener that would automatically set window to mobile mode
  useEffect(() => {
    if (bounds) {
      if (bounds?.width <= 1024 && !mobileMode) {
        setMobileMode(true);
        fullscreen();
      } else if (bounds?.width > 1024 && mobileMode) {
        setMobileMode(false);
        setToNormalMode();
      }
    }
  }, [app, mobileMode, bounds, fullscreen, setToNormalMode, setMobileMode]);

  return (
    <motion.div
      data-testid="WindowWrapper"
      transition={{ type: "tween", ease: "easeOut" }}
      style={{
        pointerEvents: "none",
        zIndex: app.zIndex,
        position: "absolute",
        x: app.fullscreen ? app.currentX : undefined,
        y: app.fullscreen ? app.currentY : undefined,
        width: app.fullscreen ? bounds?.width : app.width,
        height: app.fullscreen ? bounds?.height : app.height,
      }}
      initial={{
        opacity: 0,
      }}
      animate={
        app.fullscreen
          ? {
              opacity: 1,
              width: bounds?.width,
              height: bounds?.height,
              x: 0,
              y: app.minimized ? "100vh" : 0,
            }
          : {
              opacity: 1,
              width: app.width,
              height: app.height,
              translateY: app.minimized ? "100vh" : 0,
            }
      }
      exit={{ opacity: 0 }}
    >
      <FullscreenShadow
        shouldRender={intersecting.includes("top") && dragging && mouseDown}
        startHeight={app.height}
        startWidth={app.width}
        startX={mousePos.x!}
        startY={mousePos.y!}
        bounds={bounds!}
      />
      <Rnd
        ref={rndRef}
        disableDragging={mobileMode}
        enableResizing={!app.fullscreen}
        style={{ pointerEvents: "auto" }}
        dragHandleClassName={styles["window__head"]}
        className={
          app.fullscreen
            ? `${styles.window} ${styles["window--fullscreen"]}`
            : styles.window
        }
        default={{
          width: app.width,
          height: app.height,
          x: app.currentX,
          y: app.currentY,
        }}
        minHeight={32}
        minWidth={100}
        resizeHandleStyles={{
          top: { cursor: "n-resize" },
          bottom: { cursor: "n-resize" },
          right: { cursor: "w-resize" },
          left: { cursor: "w-resize" },
        }}
        onDragStop={(_, data) => {
          onUpdatePos(app, {
            x: data.x,
            y: data.y,
          });
          // while dragging, if user's mouse hits top of
          // viewport, we initiate fullscreen
          if (intersecting.includes("top")) {
            fullscreen();
          }
        }}
        onResizeStart={(e, d, el) => {
          onFocus && onFocus(app);
        }}
        onResizeStop={(e, d, el, delta, pos) => {
          onUpdatePos(app, {
            x: pos.x,
            y: pos.y,
          });
          onUpdateSize(app, {
            width: el.clientWidth,
            height: el.clientHeight,
          });
        }}
      >
        <div
          data-testid="window-head"
          onTouchStart={(e) => {
            onFocus && onFocus(app);
            setToOriginalSizeMobile(e);
            setDragging(true);
          }}
          onMouseDown={(e) => {
            onFocus && onFocus(app);
            setToOriginalSize(e);
            setDragging(true);
          }}
          onMouseUp={() => {
            setDragging(false);
          }}
          onTouchEnd={() => {
            setDragging(false);
          }}
          className={styles["window__head"]}
        >
          <div className={styles["window__head--actions"]}>
            <motion.button
              data-testid="window-close"
              whileHover={{ scale: 1.1, rotate: 360 }}
              className={`${styles["window__head--button"]} ${styles.exit}`}
              onMouseDown={(e) => e.stopPropagation()}
              onTap={() => onClose && onClose(app)}
            >
              &times;
            </motion.button>
            <motion.button
              data-testid="window-minimize"
              whileHover={{ scale: 1.1, rotate: 180 }}
              className={`${styles["window__head--button"]} ${styles.minimize}`}
              onTouchStart={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTap={() => {
                if (!app.minimized) {
                  toggleMinimize(app, true);
                }
              }}
            >
              &minus;
            </motion.button>
            {!mobileMode && (
              <motion.button
                data-testid="window-fullscreen"
                whileHover={{ scale: 1.1, rotate: 360 }}
                className={`${styles["window__head--button"]} ${styles.maximize}`}
                onTap={() => {
                  if (!app.fullscreen) {
                    if (onFocus) {
                      onFocus(app);
                    }
                    fullscreen();
                  }
                }}
              >
                <motion.div
                  whileHover="hover"
                  className={`${styles["maximize__wrapper"]}`}
                >
                  <motion.div
                    initial={{ rotate: -45, x: 0, y: 0 }}
                    variants={topLeftMaximizeArrow}
                    className={`${styles.arrow} ${styles["arrow--topleft"]}`}
                  />
                  <motion.div
                    initial={{ rotate: 135, x: 0, y: 0 }}
                    variants={bottomRightMaximizeArrow}
                    className={`${styles.arrow} ${styles["arrow--bottomright"]}`}
                  />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
        <div
          onMouseUp={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseDown={(e) => {
            onFocus && onFocus(app);
            e.stopPropagation();
          }}
          className={styles["window__body"]}
        >
          <DashboardAPIProvider onPushNotification={(notification) => {}}>
            <Application />
          </DashboardAPIProvider>
        </div>
      </Rnd>
    </motion.div>
  );
};

export default Window;
