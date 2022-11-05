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
import DisplayName from "./DisplayName";

interface Props {
  children?: React.ReactNode;
  peer: HMSPeer;
}

const VideoPlayer: React.FC<Props> = ({ children, peer }) => {
  const { videoRef } = useVideo({
    trackId: peer?.videoTrack,
  });
  const localPeer = useHMSStore(selectLocalPeer);
  const audioLevel = useHMSStore(selectPeerAudioByID(peer?.id));
  const micEnabled = useHMSStore(selectIsPeerAudioEnabled(peer?.id));
  const videoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer?.id));

  return (
    <div className={`${styles["video-container"]}`}>
      {!videoEnabled && (
        <div className={`${styles["video-off"]}`}>
          <VideoConferenceIcon color="darkgray" />
        </div>
      )}
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        playsInline
      />
      <DisplayName name={peer?.isLocal ? "(You)" : peer?.name} />
      <SoundIndicator audioLevel={audioLevel} micDisabled={!micEnabled} />
      {localPeer === peer && <Settings />}
    </div>
  );
};

export default VideoPlayer;
