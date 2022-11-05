import React from "react";
import styles from "./SoundIndicator.module.css";
import { motion, Transition } from "framer-motion";
import MicrophoneIcon from "../../Controls/MicrophoneIcon";

interface Props {
  audioLevel: number;
  micDisabled: boolean;
  children?: React.ReactNode;
}

const SoundIndicator: React.FC<Props> = ({ audioLevel, micDisabled }) => {
  if (micDisabled) {
    return (
      <div className={`${styles["wave-container"]} ${styles["wave-container_disabled"]}`}>
        <MicrophoneIcon color="white" />
        <div className={`${styles.cross}`} />
      </div>
    );
  }

  const levels = {
    low: [1, 1.2, 1.1, 0.6, 1],
    medium: [1, 1.2, 0.8, 1.8, 0.5, 1],
    high: [1, 1.9, 0.8, 2.2, 1],
  };

  const transition: Transition = {
    repeatType: "mirror",
    repeat: audioLevel ? Infinity : 0,
    duration: audioLevel ? 1 : 0.3,
  };

  return (
    <div className={`${styles["wave-container"]}`}>
      <motion.div
        className={`${styles.wave}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: audioLevel ? levels.low : 1 }}
        transition={transition}
      />
      <motion.div
        className={`${styles.wave}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: audioLevel ? levels.medium : 1 }}
        transition={transition}
      />
      <motion.div
        className={`${styles.wave}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: audioLevel ? levels.low : 1 }}
        transition={transition}
      />
      <motion.div
        className={`${styles.wave}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: audioLevel ? levels.high : 1 }}
        transition={transition}
      />
      <motion.div
        className={`${styles.wave}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: audioLevel ? levels.medium : 1 }}
        transition={transition}
      />
    </div>
  );
};

export default SoundIndicator;
