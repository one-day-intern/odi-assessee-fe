import React from "react";
import VideoConference from "./VideoConference";
import { render } from "@testing-library/react";
import DashboardAPIProvider from "../../../../../context/Dashboard/DashboardAPIContext";

describe("Video conference component test suite", () => {
  test("test render video conference", () => {
    render(
      <DashboardAPIProvider onPushNotification={() => {}} parentRef={{ current: document.createElement("div") }}>
        <VideoConference />
      </DashboardAPIProvider>
    );
  });
});
