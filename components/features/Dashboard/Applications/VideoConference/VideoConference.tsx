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
import useSWRImmutable from "swr/immutable";
import { getRoomToken } from "@services/Dashboard/VideoConference";
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
  const [isEnteredConference, setIsEnteredConference] = useState(false);
  const isPreviewReady = useHMSStore(selectIsInPreview);
  const isInCall = useHMSStore(selectIsConnectedToRoom);

  const enterConference = async () => {
    setLoading(true);
    await conference
      .preview({ userName: "Rashad Aziz", authToken: data?.token })
      .then(() => setIsEnteredConference(true))
      .catch((e: Error) => console.log(e));
    setLoading(false)
  };

  const joinConference = async () => {
    await conference.join({ userName: "Rashad Aziz", authToken: data?.token! });
  };

  const leaveConference = useCallback(async () => {
    setLoading(true)
    await conference.leave();
    setIsEnteredConference(false);
    setLoading(false);
  }, [conference, setIsEnteredConference]);

  useEffect(() => {
    conference.setLogLevel(HMSLogLevel.NONE);

    window.addEventListener("beforeunload", leaveConference);
    window.addEventListener("onunload", leaveConference);

    return () => {
      conference.leave();
      window.removeEventListener("beforeunload", leaveConference);
      window.removeEventListener("onunload", leaveConference);
    };
  }, [conference, leaveConference]);

  if (!loading) {
    if (!isEnteredConference) {
      return (
        <VideoConferenceLanding onEnterConference={() => enterConference()} />
      );
    }
    if (isPreviewReady) {
      return <PreviewVideo onJoinConference={() => joinConference()} onLeaveConference={() => leaveConference()}/>;
    }
    if (isInCall) {
      return <Room onLeaveConference={() => leaveConference()} />;
    }
  }
  return <Spinner />;
};

const VideoConference = () => {
  const { data, error, isValidating, mutate } = useSWRImmutable(
    "wizzy",
    getRoomToken,
    { errorRetryCount: 0 }
  );

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
