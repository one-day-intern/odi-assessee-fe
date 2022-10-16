import React from "react";
import NetworkLine from "../NetworkLine";
import styles from "./VideoConferenceArt.module.css";

const Avatar: React.FC<ApplicationIconProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width ?? "75%"}
      height={height ?? "75%"}
      fill={color ?? "black"}
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <path
            d="M333.187,237.405c32.761-23.893,54.095-62.561,54.095-106.123C387.282,58.893,328.389,0,256,0
             S124.718,58.893,124.718,131.282c0,43.562,21.333,82.23,54.095,106.123C97.373,268.57,39.385,347.531,39.385,439.795
             c0,39.814,32.391,72.205,72.205,72.205H400.41c39.814,0,72.205-32.391,72.205-72.205
             C472.615,347.531,414.627,268.57,333.187,237.405z M164.103,131.282c0-50.672,41.225-91.897,91.897-91.897
             s91.897,41.225,91.897,91.897S306.672,223.18,256,223.18S164.103,181.954,164.103,131.282z M400.41,472.615H111.59
             c-18.097,0-32.82-14.723-32.82-32.821c0-97.726,79.504-177.231,177.231-177.231s177.231,79.504,177.231,177.231
             C433.231,457.892,418.508,472.615,400.41,472.615z"
          />
        </g>
      </g>
    </svg>
  );
};

interface VideoConferenceArtProps {
  southeastConnection?: true;
  southwestConnection?: true;
  westConnection?: true;
  eastConnection?: true;
  style?: React.CSSProperties;
}

const VideoConferenceArt: React.FC<VideoConferenceArtProps> = ({
  style,
  southeastConnection,
  southwestConnection,
  westConnection,
  eastConnection,
}) => {
  return (
    <div className={styles["outer-container"]} style={style}>
      {southeastConnection && (
        <NetworkLine
          bitMargin={10}
          bitTravelTime={5}
          bits={12}
          style={{
            bottom: "25%",
            left: "75%",
            transform: "rotate(60deg)",
            transformOrigin: "left",
          }}
        />
      )}
      {southwestConnection && (
        <NetworkLine
          bitMargin={10}
          bitTravelTime={5}
          bits={12}
          style={{
            top: "25%",
            left: "-157%",
            transform: "rotate(-60deg)",
            transformOrigin: "right",
          }}
        />
      )}
      {westConnection && (
         <NetworkLine
         bitMargin={10}
         bitTravelTime={5}
         bits={12}
         style={{
           top: "50%",
           right: "100%",
           transform: "rotate(180deg)"
         }}
       />
      )}
      <div className={styles["inner-container"]}>
        <Avatar color="#9076C0" />
      </div>
    </div>
  );
};
export default VideoConferenceArt;
