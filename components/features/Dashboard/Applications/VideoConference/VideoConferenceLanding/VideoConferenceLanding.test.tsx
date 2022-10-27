import React from "react";
import VideoConferenceLanding from "./VideoConferenceLanding";
import { render } from "@testing-library/react";
import DashboardAPIProvider from "../../../../../../context/Dashboard/DashboardAPIContext";

describe("Video Conference Landing component test suite", () => {
  test("testing render component", () => {
    const { getByTestId } = render(
      <DashboardAPIProvider
        onPushNotification={() => {}}
        parentRef={{ current: document.createElement("div") }}
      >
        <VideoConferenceLanding
          onEnterConference={() => {}}
          onEnterConferenceWithPreview={() => {}}
        />
      </DashboardAPIProvider>
    );
    getByTestId("EnterConference");
  });
});
