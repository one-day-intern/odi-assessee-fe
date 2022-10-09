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
  const connState = useRef({ joining: false, leaving: false });
  const conference = useHMSActions();
  const isPreviewReady = useHMSStore(selectIsInPreview);
  const isInCall = useHMSStore(selectIsConnectedToRoom);
  const { data, error, isValidating, mutate } = useSWRImmutable(
    "wizzy",
    getRoomToken,
    { errorRetryCount: 0 }
  );

  const joinCall = async () => {
    connState.current.joining = true;
    await conference.join({ userName: "wizzy", authToken: data?.token! });
    connState.current.joining = false;
  };

  const leaveConference = useCallback(async () => {
    if (isPreviewReady || isInCall) {
      if (!connState.current.joining && !connState.current.leaving) {
        connState.current.leaving = true;
        await conference.leave();
        connState.current.leaving = false;
      }
    }
  }, [conference, isInCall, isPreviewReady]);

  useEffect(() => {
    conference.setLogLevel(HMSLogLevel.NONE);
    if (!isPreviewReady && !isInCall && data?.token) {
      conference
        .preview({ userName: "wizzy", authToken: data?.token! })
        .catch((e: Error) => console.log("TOKEN ERROR"));
    }

    window.addEventListener("beforeunload", leaveConference);
    window.addEventListener("onunload", leaveConference);

    return () => {
      leaveConference();
      window.removeEventListener("beforeunload", leaveConference);
      window.removeEventListener("onunload", leaveConference);
    };
  }, [data, conference, isPreviewReady, isInCall, leaveConference]);

  if (isInCall) {
    return <Room onLeave={() => leaveConference()} />;
  }
  if (isPreviewReady) {
    return <PreviewVideo onJoinCall={() => joinCall()} />;
  }
  if (!error || isValidating) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>500 internal server error</h1>
      <button onClick={() => mutate()}>refresh</button>
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
