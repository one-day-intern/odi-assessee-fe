import React, { useEffect, useRef, useCallback } from "react";
import styles from "./VideoConference.module.css";
import Room, { PreviewVideo } from "./Room";
import {
  HMSRoomProvider,
  useHMSActions,
  selectIsInPreview,
  selectIsConnectedToRoom,
  useHMSStore,
  HMSLogLevel,
} from "@100mslive/react-sdk";
import useSWRImmutable from "swr/immutable";
import { getRoomToken } from "@services/Dashboard/VideoConference";

const Spinner = () => {
  return (
    <div className={styles["lds-ring"]}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

const Conference: React.FC = () => {
  return (
    <div>
    </div>
  );
};

const VideoConference = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        overflow: "auto",
      }}
    >
      <HMSRoomProvider>
        <Conference />
      </HMSRoomProvider>
      <div id="video-conference-modal" />
    </div>
  );
};

export default VideoConference;
