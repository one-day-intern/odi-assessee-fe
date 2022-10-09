import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useHMSStore, selectPeers } from "@100mslive/react-sdk";
import VideoPlayer from "../VideoPlayer";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";
import Controls from "../Controls";

interface Props {
  children?: React.ReactNode;
  onLeave: () => void;
}

const Room: React.FC<Props> = ({ onLeave }) => {
  const { app } = useDashboardAPI();
  const peers = useHMSStore(selectPeers);

  const normalMode =
    (app?.width >= 1024 || app.fullscreen) && window.innerWidth >= 1024;

  let participantLayout = "single";

  switch (peers.length) {
    case 1:
      participantLayout = "single";
      break;
    case 2:
      participantLayout = "double";
      break;
    default:
      participantLayout = "multiple";
      break;
  }

  return (
    <div
      className={`${styles.room} ${styles[participantLayout]} ${
        normalMode ? "" : styles.mobile
      }`}
    >
      
    </div>
  );
};

export default Room;
