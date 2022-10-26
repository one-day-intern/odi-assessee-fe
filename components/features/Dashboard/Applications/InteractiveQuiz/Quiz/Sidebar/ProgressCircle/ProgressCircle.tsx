import React, { useMemo, useState, useEffect, useRef } from "react";
import styles from "./ProgressCircle.module.css";

interface Props extends React.PropsWithChildren {
  currentProgress: number;
  animationSpeed?: number;
}

/**
 * @param currentProgress number between 0 - 1
 * @param animationSpeed (optional) animation speed in ms
 */
const ProgressCircle: React.FC<Props> = ({
  currentProgress,
  animationSpeed = 300,
}) => {
  const progress = useMemo(
    () => Math.round(currentProgress * 100),
    [currentProgress]
  );
  const [displayedProgress, setDisplayedProgress] = useState(0);

  if (progress > 100 || progress < 0) {
    throw new Error("Invalid progress value. (must be between 0 - 1)")
  }

  useEffect(() => {
    const difference = progress - displayedProgress;
    if (difference === 0) {
      return;
    }
    const timeout = setTimeout(() => {
      if (difference > 0) {
        setDisplayedProgress((prev) => prev + 1);
      } else {
        setDisplayedProgress((prev) => prev - 1);
      }
    }, animationSpeed / Math.abs(difference));

    return () => clearTimeout(timeout);
  }, [progress, displayedProgress, animationSpeed]);

  return (
    <div className={`${styles["progress-circle_parent"]}`}>
      <div
        className={`${styles["progress-circle"]}`}
        style={{
          background: `conic-gradient(#3d65d8 ${
            displayedProgress * 3.6
          }deg, #ccc ${displayedProgress * 3.6}deg)`,
        }}
      >
        <div className={`${styles["progress-circle_value"]}`}>
          {displayedProgress}%
        </div>
      </div>
      <p className={`${styles["progress-circle_caption"]}`}>Completed</p>
    </div>
  );
};

export default ProgressCircle;
