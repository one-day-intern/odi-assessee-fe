import React from "react";
import VideoPlayer from "./VideoPlayer";
import { render } from "@testing-library/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";

describe("Video player component test suite", () => {
  test("testing render video player", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(
      <HMSRoomProvider>
        <VideoPlayer
          peer={{
            name: "Rashad",
            isLocal: true,
            auxiliaryTracks: [],
            id: "id",
            videoTrack: undefined,
          }}
        />
      </HMSRoomProvider>
    );
  });
});
