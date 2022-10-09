import React from "react";
import styles from "./VideoPlayer.module.css";
import SoundIndicator from "./SoundIndicator";
import {
  HMSPeer,
  useHMSStore,
  selectPeerAudioByID,
  useVideo,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import { VideoConferenceIcon } from "../VideoConferenceIcon";
import Settings from "./Settings";

interface Props {
  children?: React.ReactNode;
  peer: HMSPeer;
}

const VideoPlayer: React.FC<Props> = ({ children, peer }) => {

  return (
    <div className={`${styles["video-container"]}`}>
    </div>
  );
};

export default VideoPlayer;
