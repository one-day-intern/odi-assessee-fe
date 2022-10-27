import React from "react";
import styles from "./FullscreenShadow.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface Props {
  children?: React.ReactNode;
  zIndex: number;
  shouldRender: boolean;
  startWidth: number;
  startHeight: number;
  startX: number;
  startY: number;
  bounds: DOMRect;
}

const FullscreenShadow: React.FC<Props> = ({
  shouldRender,
  startWidth,
  startHeight,
  startX,
  startY,
  bounds,
  zIndex,
}) => {
  return createPortal(
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          data-testid="fullscreen-shadow"
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          }}
          style={{ 
            zIndex: zIndex,
          }}
          className={styles["fullscreen__shadow"]}
          initial={{
            opacity: 1,
            width: startWidth,
            height: startHeight,
            x: startX,
            y: startY,
          }}
          animate={{
            width: bounds.width - 20,
            height: bounds.height - 20,
            x: 10,
            y: 10,
          }}
          exit={{
            opacity: 0,
            width: innerWidth,
            height: innerHeight,
          }}
        />
      )}
    </AnimatePresence>,
    document.getElementById("shadow-container")!
  );
};

export default FullscreenShadow;
