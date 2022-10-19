import React, { useEffect, useRef, useCallback, useState } from "react";
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
import VideoConferenceLanding from "./VideoConferenceLanding";

interface ConferenceProps {
  data: any | undefined;
  children?: React.ReactNode;
}

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

const Conference: React.FC<ConferenceProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const conference = useHMSActions();
  const isPreviewReady = useHMSStore(selectIsInPreview);
  const isInCall = useHMSStore(selectIsConnectedToRoom);

  const enterConference = async () => {
    setLoading(true);
    await conference
      .join({ userName: "Rashad Aziz", authToken: data?.token })
      .catch((e: Error) => console.log(e));
    setLoading(false);
  };

  const enterConferenceWithPreview = async () => {
    setLoading(true);
    await conference
      .preview({ userName: "Rashad Aziz", authToken: data?.token })
      .catch((e: Error) => console.log(e));
    setLoading(false);
  };

  const leaveConference = useCallback(async () => {
    setLoading(true);
    await conference.leave();
    setLoading(false);
  }, [conference]);

  useEffect(() => {
    conference.setLogLevel(HMSLogLevel.NONE);

    window.addEventListener("beforeunload", leaveConference);
    window.addEventListener("onunload", leaveConference);

    return () => {
      leaveConference();
      window.removeEventListener("beforeunload", leaveConference);
      window.removeEventListener("onunload", leaveConference);
    };
  }, [conference, leaveConference]);

  if (!loading) {
    if (!isPreviewReady && !isInCall) {
      return (
        <VideoConferenceLanding
          onEnterConference={() => enterConference()}
          onEnterConferenceWithPreview={() => enterConferenceWithPreview()}
        />
      );
    }
    if (isPreviewReady) {
      return (
        <PreviewVideo
          onJoinConference={() => enterConference()}
          onLeaveConference={() => leaveConference()}
        />
      );
    }
    if (isInCall) {
      return <Room onLeaveConference={() => leaveConference()} />;
    }
  }
  return <Spinner />;
};

const VideoConference = () => {
  const data = { token: process.env.NEXT_PUBLIC_HMS_DEV_TOKEN }

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
        <Conference data={data} />
      </HMSRoomProvider>
      <div id="video-conference-modal" />
    </div>
  );
};

export default VideoConference;
