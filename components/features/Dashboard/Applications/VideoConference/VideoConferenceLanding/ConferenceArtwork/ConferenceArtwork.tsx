import React from "react";
import VideoConferenceArt from "./VideoConferenceArt";

const ConferenceArtwork = () => {
  return (
    <div
      data-testid="ConferenceArtwork"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "800px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
      }}
    >
      <VideoConferenceArt
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -200%)" }}
        southeastConnection
        southwestConnection
      />
      <VideoConferenceArt
        style={{ top: "50%", left: "50%", transform: "translate(50%, 80%)" }}
        westConnection
      />
      <VideoConferenceArt
        style={{ top: "50%", left: "50%", transform: "translate(-150%, 80%)" }}
      />
      <h2
        style={{
          fontSize: "2em",
          color: "#3D65D8",
          textAlign: "center",
          marginBottom: "8rem"
        }}
      >
        Feel the experience.
      </h2>
    </div>
  );
};

export default ConferenceArtwork;
