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
      
    </div>
  );
};

export default Controls;
