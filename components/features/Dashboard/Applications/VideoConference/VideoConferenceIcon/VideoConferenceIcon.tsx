import React from "react";

export const VideoConferenceIcon: React.FC<ApplicationIconProps> = ({ width, height, color }) => {
  return (
    <svg
      width={`${width ?? 70}`}
      height={`${height ?? 51}`}
      viewBox="0 0 70 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13.4253C3 7.66758 7.66759 3 13.4253 3H37.7511C43.5089 3 48.1765 7.66759 48.1765 13.4253V37.7511C48.1765 43.5089 43.5089 48.1765 37.7511 48.1765H13.4253C7.66758 48.1765 3 43.5089 3 37.7511V13.4253Z"
        stroke={`${color ?? "#3D65D8"}`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M48.1765 26.0907C48.1765 24.3422 48.8355 22.658 50.0221 21.3738L60.9726 9.523C63.1189 7.20023 67 8.71884 67 11.8814V40.3448C67 43.358 63.4273 44.9433 61.1931 42.9215L50.4631 33.2113C49.0071 31.8937 48.1765 30.0217 48.1765 28.058V26.0907Z"
        stroke={`${color ?? "#3D65D8"}`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

