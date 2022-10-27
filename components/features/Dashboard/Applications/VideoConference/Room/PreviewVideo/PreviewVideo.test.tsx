import React from "react";
import PreviewVideo from "./PreviewVideo";
import { render } from "@testing-library/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import DashboardAPIProvider from "../../../../../../../context/Dashboard/DashboardAPIContext";

describe("Preview video component test suite", () => {
  test("testing render preview video", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(
      <DashboardAPIProvider parentRef={{ current: document.createElement("div") }} onPushNotification={() => {}}>
        <HMSRoomProvider>
          <PreviewVideo onJoinCall={() => {}} />
        </HMSRoomProvider>
      </DashboardAPIProvider>
    );
  });
});
