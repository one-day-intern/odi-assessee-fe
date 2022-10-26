import React from "react";
import styles from "./ProgressIndicator.module.css";
import { motion } from "framer-motion";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isCurrentQuestion?: boolean;
  questionCompleted?: boolean;
}

const ProgressIndicator: React.FC<React.PropsWithChildren<Props>> = ({
  questionCompleted,
  isCurrentQuestion,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${styles["progress-indicator"]} ${
        isCurrentQuestion ? styles.active : ""
      }`}
    >
      <div className={`${styles["indicator-container"]}`}>
        <motion.div
          className={`${styles.indicator} ${isCurrentQuestion && !questionCompleted ? styles.current : ""}`}
          initial={{ width: 12, height: 12 }}
          animate={{
            width: questionCompleted ? 22 : 12,
            height: questionCompleted ? 22 : 12,
          }}
        >
          <motion.svg
            width="60%"
            height="60%"
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M1 10.0456L7.95441 17L23.9544 1"
              stroke="white"
              strokeWidth="4"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: questionCompleted ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
              }}
            />
          </motion.svg>
        </motion.div>
      </div>
      <div style={{ color: isCurrentQuestion ? "#3D65D8" : "#ccc" }}>
        Question X
      </div>
    </motion.button>
  );
};

export default ProgressIndicator;
