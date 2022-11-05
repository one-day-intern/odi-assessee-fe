import React from "react";
import { render } from "@testing-library/react";
import EssayQuestion from "./EssayQuestion";
import DashboardAPIProvider from "../../../../../../../context/Dashboard/DashboardAPIContext";

describe("Essay Question component test suite", () => {
  test("test render component", () => {
    const dummyRef = { current: document.createElement("div") };
    render(
      <DashboardAPIProvider parentRef={dummyRef} onPushNotification={() => {}}>
        <EssayQuestion />
      </DashboardAPIProvider>
    );
  });
});
