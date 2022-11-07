import React from "react";
import InteractiveQuiz from "./InteractiveQuiz";
import { render } from "@testing-library/react";
import DashboardAPIProvider from "../../../../../context/Dashboard/DashboardAPIContext";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

describe("InteractiveQuiz component test suite", () => {
  test("render component", () => {
    const dummyRef = { current: document.createElement("div") };
    const { getByTestId } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <DashboardAPIProvider
          parentRef={dummyRef}
          onPushNotification={() => {}}
        >
          <InteractiveQuiz />
        </DashboardAPIProvider>
      </RouterContext.Provider>
    );
    getByTestId("InteractiveQuiz");
  });
});
