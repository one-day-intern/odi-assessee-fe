import React from "react";
import {
  useHMSStore,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import styles from "./PreviewVideo.module.css";
import VideoPlayer from "../../VideoPlayer";
import Controls from "../../Controls";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";

interface Props {
  children?: React.ReactNode;
  onJoinCall: () => void;
}

const PreviewVideo: React.FC<Props> = ({ onJoinCall }) => {
  const peer = useHMSStore(selectLocalPeer);
  const { app } = useDashboardAPI();

  const normalMode =
    (app?.width >= 1280 || app.fullscreen) && window.innerWidth >= 1280;

  return (
    <div className={`${styles["preview-video_container"]}`}>
     
    </div>
  );
};

export default PreviewVideo;
