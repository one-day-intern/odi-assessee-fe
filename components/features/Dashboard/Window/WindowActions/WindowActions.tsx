import React from "react";
import { motion } from "framer-motion";
import styles from "../Window.module.css";
import type { Variants } from "framer-motion";

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

interface Props extends React.PropsWithChildren {
  app: Application;
  mobileMode?: boolean;
  onClose?: (app: Application) => void;
  onFocus?: (app: Application) => void;
  toggleMinimize: (app: Application, minimize: boolean) => void;
  toggleFullscreen: (app: Application, fullscreen: boolean) => void;
}

const WindowActions: React.FC<Props> = ({
  app,
  mobileMode,
  onClose,
  toggleFullscreen,
  toggleMinimize,
  onFocus,
}) => {
  return (
    <div className={styles["window__head--actions"]}>
      <motion.button
        data-testid="window-close"
        whileHover={{ scale: 1.1, rotate: 360 }}
        className={`${styles["window__head--button"]} ${styles.exit}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => onClose && onClose(app)}
      >
        &times;
      </motion.button>
      <motion.button
        data-testid="window-minimize"
        whileHover={{ scale: 1.1, rotate: 180 }}
        className={`${styles["window__head--button"]} ${styles.minimize}`}
        onTouchStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
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
          onClick={() => {
            if (onFocus) {
              onFocus(app);
            }
            toggleFullscreen(app, !app.fullscreen);
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
  );
};

export default React.memo(WindowActions);
