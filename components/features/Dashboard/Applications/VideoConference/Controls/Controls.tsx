import React from "react";
import styles from "./Controls.module.css";
import { motion } from "framer-motion";
import { useAVToggle } from "@100mslive/react-sdk";
import { VideoConferenceIcon } from "../VideoConferenceIcon";
import MicrophoneIcon from "./MicrophoneIcon";
import LeaveIcon from "./LeaveIcon";

interface Props {
  onLeave?: () => void;
}

const Controls: React.FC<Props> = ({ onLeave }) => {
  const { isLocalVideoEnabled, isLocalAudioEnabled, toggleAudio, toggleVideo } =
    useAVToggle((e) => { console.log(e.name) });

  return (
    <div className={`${styles.controls}`}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className={`${styles["controls-button"]} ${
          isLocalVideoEnabled ? "" : styles.disabled
        }`}
        onClick={toggleVideo}
      >
        <VideoConferenceIcon color={isLocalVideoEnabled ? "black" : "white"} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className={`${styles["controls-button"]} ${
          isLocalAudioEnabled ? "" : styles.disabled
        }`}
        onClick={toggleAudio}
      >
        <MicrophoneIcon color={isLocalAudioEnabled ? "black" : "white"} />
      </motion.button>
      {onLeave && (
        <motion.button
        whileTap={{ scale: 0.8 }}
          onClick={() => onLeave()}
          className={`${styles["controls-button"]} ${styles.disabled}`}
        >
          <LeaveIcon color="white" />
        </motion.button>
      )}
    </div>
  );
};

export default Controls;
