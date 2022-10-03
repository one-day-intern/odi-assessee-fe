import React from "react";
import styles from "./VideoConference.module.css";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";

const VideoConference = () => {
  const { pushNotification } = useDashboardAPI();

  return (
    <div style={{ width: "100%", height: "100%", background: "white" }}>
      <button
        onClick={() =>
          pushNotification({
            id: "notification-1",
            message: "hello from video conference",
            priority: "high",
          })
        }
      >
        Push Notification
      </button>
    </div>
  );
};

export default VideoConference;
