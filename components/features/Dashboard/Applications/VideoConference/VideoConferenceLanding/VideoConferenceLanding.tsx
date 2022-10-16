import React from "react";
import styles from "./VideoConferenceLanding.module.css";
import ConferenceArtwork from "./ConferenceArtwork";
import { Button } from "@components/shared/elements/Button";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";

interface Props {
  onEnterConference: () => void;
  onEnterConferenceWithPreview: () => void;
}

const buttonStyles: React.CSSProperties = {
  fontSize: "1em",
  fontWeight: "bold",
  maxWidth: 350,
  margin: "1rem",
};

const VideoConferenceLanding: React.FC<Props> = ({
  onEnterConference,
  onEnterConferenceWithPreview,
}) => {
  const { app } = useDashboardAPI();

  const normalMode =
    (app?.width >= 1220 || app.fullscreen) && window.innerWidth >= 1220;

  return (
    <div
      data-testid="EnterConference"
      className={`${styles["landing-container"]}`}
    >
      {normalMode && (
        <section className={`${styles.section}`}>
          <ConferenceArtwork />
        </section>
      )}
      <section className={`${styles.section}`}>
        <div className={`${styles["svg-wrapper"]}`}>
          <OdiLogo />
        </div>
        <h1 className={`${styles.title} ${normalMode ? "" : styles.mobile}`}>
          Video Conferencing
        </h1>
        <Button
          style={buttonStyles}
          variant="secondary"
          onClick={() => onEnterConferenceWithPreview()}
        >
          Preview Join
        </Button>
        <Button
          style={buttonStyles}
          variant="primary"
          onClick={() => onEnterConference()}
        >
          Join Conference
        </Button>
      </section>
    </div>
  );
};

export default VideoConferenceLanding;
