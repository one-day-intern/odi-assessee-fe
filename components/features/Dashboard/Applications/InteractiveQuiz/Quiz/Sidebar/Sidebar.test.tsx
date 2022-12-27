import React from "react";
import Sidebar from "./Sidebar";
import { render } from "@testing-library/react";
import DashboardAPIProvider from "../../../../../../../context/Dashboard/DashboardAPIContext/DashboardAPIContext";

let spy: jest.SpyInstance;

beforeAll(() => {
  spy = jest.spyOn(document, "getElementById");
  const container = document.createElement("div");
  document.body.appendChild(container);
  spy.mockReturnValue(container);
});

describe("Sidebar component test suite", () => {
  test("render component", () => {
    const dummyRef = document.createElement("div");
    const { getByTestId } = render(
      <DashboardAPIProvider
        parentRef={{ current: dummyRef }}
        onPushNotification={() => {}}
      >
        <Sidebar
          questions={[
            {
              "question-attempt-id": "some-attempt-id-1",
              "is-answered": false,
              prompt: "hello",
              "question-type": "multiple_choice",
              "answer-options": [
                {
                  "answer-option-id": "ldhkawdwa",
                  content: "hello",
                },
              ],
              "selected-answer-option-id": null,
            },
            {
              "question-attempt-id": "some-attempt-id",
              "is-answered": false,
              prompt: "hello",
              "question-type": "text",
              answer: "test",
            },
          ]}
          currentQuestion={0}
          setCurrentQuestion={() => {}}
        />
      </DashboardAPIProvider>
    );
    getByTestId("QuizSidebar");
  });
});
