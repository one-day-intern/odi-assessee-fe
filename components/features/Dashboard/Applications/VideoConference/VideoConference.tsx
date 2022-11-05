import React, { useEffect, useCallback, useState } from "react";
import styles from "./VideoConference.module.css";
import Room, { PreviewVideo } from "./Room";
import {
  HMSRoomProvider,
  useHMSActions,
  selectIsInPreview,
  selectIsConnectedToRoom,
  useHMSStore,
  HMSLogLevel,
  selectLocalPeer,
  HMSNotificationTypes,
  useHMSNotifications,
} from "@100mslive/react-sdk";
import VideoConferenceLanding from "./VideoConferenceLanding";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useAuthContext } from "@context/Authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Loader } from "@components/shared/elements/Loader";

interface ConferenceProps {
  children?: React.ReactNode;
}

const Conference: React.FC<ConferenceProps> = () => {
  const [loading, setLoading] = useState(false);
  const conference = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const isPreviewReady = useHMSStore(selectIsInPreview);
  const isInCall = useHMSStore(selectIsConnectedToRoom);
  const roomEnded = useHMSNotifications(HMSNotificationTypes.ROOM_ENDED);
  const router = useRouter();
  const { fetchData } = useGetRequest<{ token: string }>(
    `/video-conference/rooms/join/assessee/?assessment_event_id=${router.query["assessment-event-id"]}`,
    { requiresToken: true, disableFetchOnMount: true }
  );
  const { user } = useAuthContext();
  const fullName = `${user?.first_name} ${user?.last_name}`;

  const enterConference = async () => {
    setLoading(true);
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error(response.message);
      if (isPreviewReady) {
        await conference.leave();
      }
    } else {
      const token = response.token;
      await conference
        .join({ userName: fullName, authToken: token })
        .catch((e: Error) => console.log(e));
    }
    setLoading(false);
  };

  const enterConferenceWithPreview = async () => {
    setLoading(true);
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error(response.message);
    } else {
      const token = response.token;
      await conference
        .preview({ userName: fullName, authToken: token })
        .catch((e: Error) => console.log(e));
    }
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

  useEffect(() => {
    if (roomEnded) {
      toast.info(roomEnded.data.reason);
    }
  }, [roomEnded]);

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
      if (localPeer.roleName === "waiting-room") {
        return (
          <div className={styles["waiting-room"]}>
            <h1>You are now in the waiting room</h1>
            <h2>Please wait until the host has let you in</h2>
          </div>
        );
      }
      return <Room onLeaveConference={() => leaveConference()} />;
    }
  }
  return (
    <div className={styles["loader-container"]}>
      <Loader />
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
