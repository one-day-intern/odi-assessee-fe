import React from "react";
import { render } from "@testing-library/react";
import Quiz from "./Quiz";
import DashboardAPIProvider from "../../../../../../context/Dashboard/DashboardAPIContext";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../../mocks/createMockRouter";
import { act } from "react-dom/test-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Quiz component test suite", () => {
  test("test render component", async () => {
    const dummyRef = { current: document.createElement("div") };
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <DashboardAPIProvider
          parentRef={dummyRef}
          onPushNotification={() => {}}
        >
          <Quiz
            quiz={{
              id: "dhalwkhdlwa",
              type: "bla",
              name: "bla",
              description: "",
              additional_info: {},
              released_time: "22:22:22",
              end_working_time: "22:22:22",
            }}
            setCurrentActiveQuiz={() => {}}
          />
        </DashboardAPIProvider>
      </RouterContext.Provider>
    );
    await sleep(100);
  });
});
