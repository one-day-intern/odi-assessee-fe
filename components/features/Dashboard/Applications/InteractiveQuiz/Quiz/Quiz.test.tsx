import React from "react";
import { render } from "@testing-library/react";
import Quiz from "./Quiz";
import DashboardAPIProvider from "../../../../../../context/Dashboard/DashboardAPIContext";

describe("Quiz component test suite", () => {
  test("test render component", () => {
    const dummyRef = { current: document.createElement("div") };
    render(
      <DashboardAPIProvider parentRef={dummyRef} onPushNotification={() => {}}>
        <Quiz />
      </DashboardAPIProvider>
    );
  });
});
