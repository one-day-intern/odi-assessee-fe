import React from "react";
import Settings from "./Settings";
import { act, fireEvent, render } from "@testing-library/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";

describe("Settings component test suite", () => {
  test("testing render settings", () => {
    render(
      <>
        <HMSRoomProvider>
          <Settings />
          <div id="video-conference-modal"></div>
        </HMSRoomProvider>
      </>
    );
  });
  test("test open settings modal", () => {
    const { getByTestId } = render(
      <HMSRoomProvider>
        <Settings />
        <div id="video-conference-modal"></div>
      </HMSRoomProvider>
    );
    const button = getByTestId("VideoSettings");
    act(() => {
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
    });
    getByTestId("SettingsModal");
  });
});
