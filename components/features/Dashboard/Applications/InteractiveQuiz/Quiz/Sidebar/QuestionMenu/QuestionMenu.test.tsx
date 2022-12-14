import React from "react";
import QuestionMenu from "./QuestionMenu"
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

let spy: jest.SpyInstance;

beforeAll(() => {
    spy = jest.spyOn(document, "getElementById");
    const container = document.createElement("div");
    document.body.appendChild(container);
    spy.mockReturnValue(container)
})

describe("InteractiveQuiz component test suite", () => {
    test("render component", () => {
        const { getByTestId } = render(<QuestionMenu questions={[
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
          setCurrentQuestion={() => {}}/>);
        getByTestId("QuestionMenu")
    })
    test("open question menu", () => {
        const { getByTestId } = render(<QuestionMenu questions={[
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
          setCurrentQuestion={() => {}} />);
        const menuButton = getByTestId("QuestionMenu").querySelector(".menu-button");

        act(() => {
            fireEvent.mouseDown(menuButton!);
            fireEvent.mouseUp(menuButton!);
        })

        getByTestId("QuestionMenuTab");
    })
})