import React from "react";

const OdiLogo = ({ width, height }: OdiLogoProps) => {
  return (
    <svg
      data-testid="odilogo"
      width={`${width ?? 112}`}
      height={`${height ?? 86}`}
      viewBox="0 0 112 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_462_311"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="17"
        width="108"
        height="69"
      >
        <path
          d="M4 85.6913V66.8185C4.24042 64.8551 5.75505 61.0725 9.89024 61.6495H44.9913C49.1264 61.0725 50.6411 64.8551 50.8815 66.8185V85.6913"
          stroke="#2A666B"
          strokeWidth="7.55006"
        />
        <circle
          cx="27.4406"
          cy="39.111"
          r="18.1516"
          stroke="#2A666B"
          strokeWidth="7.55006"
        />
        <path
          d="M72.1975 58H58.6596V19.8103H72.3094C76.1507 19.8103 79.4575 20.5748 82.2298 22.1039C85.002 23.6206 87.134 25.8023 88.6258 28.6491C90.13 31.496 90.8821 34.9022 90.8821 38.8679C90.8821 42.846 90.13 46.2646 88.6258 49.1239C87.134 51.9831 84.9896 54.1773 82.1925 55.7064C79.4078 57.2355 76.0761 58 72.1975 58ZM66.7338 51.0818H71.8619C74.2487 51.0818 76.2564 50.6592 77.8849 49.8138C79.5259 48.9561 80.7566 47.6321 81.5771 45.842C82.41 44.0394 82.8265 41.7147 82.8265 38.8679C82.8265 36.0459 82.41 33.7398 81.5771 31.9497C80.7566 30.1596 79.5321 28.8418 77.9036 27.9965C76.275 27.1511 74.2674 26.7285 71.8805 26.7285H66.7338V51.0818ZM107.563 19.8103V58H99.4888V19.8103H107.563Z"
          fill="#2A666B"
        />
        <line
          x1="53.5283"
          y1="82.6128"
          x2="107.889"
          y2="82.6128"
          stroke="#2A666B"
          strokeWidth="6.04005"
        />
      </mask>
      <g mask="url(#mask0_462_311)">
        <rect
          x="-14.4219"
          y="0.770508"
          width="145.263"
          height="97.8488"
          fill="url(#paint0_radial_462_311)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_462_311"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(95.054 139.692) rotate(-113.078) scale(151.006 224.179)"
        >
          <stop offset="0.481851" stopColor="#3D65D8" />
          <stop offset="1" stopColor="#EAA799" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export { OdiLogo };