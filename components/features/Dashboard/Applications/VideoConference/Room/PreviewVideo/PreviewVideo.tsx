import React from "react";
import {
  useHMSStore,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import styles from "./PreviewVideo.module.css";
import VideoPlayer from "../../VideoPlayer";
import Controls from "../../Controls";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";
import { Button } from "@components/shared/elements/Button"

interface Props {
  children?: React.ReactNode;
  onJoinConference: () => void;
  onLeaveConference: () => void;
}

const PreviewVideo: React.FC<Props> = ({ onJoinConference, onLeaveConference }) => {
  const peer = useHMSStore(selectLocalPeer);
  const { app } = useDashboardAPI();

  const normalMode =
    (app?.width >= 1280 || app.fullscreen) && window.innerWidth >= 1280;

  return (
    <div className={`${styles["preview-video_container"]} ${normalMode ? styles.wide : ""}`}>
      <div className={`${styles["preview-player_container"]}`}>
        <VideoPlayer peer={peer} />
      </div>
      <div className={`${styles["preview-video_controls"]} ${normalMode ? "" : styles.mobile}`}>
        <h1 className={`${styles["preview-video_header"]}`}>
          Ready to join?
        </h1>
        <Controls />
        <Button variant="secondary" onClick={() => onJoinConference()} style={{ maxWidth: 200, fontSize: "1em",fontWeight: "bold" }}>Join Conference</Button>
      </div>
    </div>
  );
};

export default PreviewVideo;
