import React from "react";
import InteractiveQuiz from "./InteractiveQuiz";
import { render } from "@testing-library/react";
import DashboardAPIProvider from "../../../../../context/Dashboard/DashboardAPIContext";

describe("InteractiveQuiz component test suite", () => {
  test("render component", () => {
    const dummyRef = { current: document.createElement("div") };
    const { getByTestId } = render(
      <DashboardAPIProvider parentRef={dummyRef} onPushNotification={() => {}}>
        <InteractiveQuiz />
      </DashboardAPIProvider>
    );
    getByTestId("InteractiveQuiz");
  });
});
