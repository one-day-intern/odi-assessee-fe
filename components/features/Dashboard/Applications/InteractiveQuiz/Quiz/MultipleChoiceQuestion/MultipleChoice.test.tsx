import React from "react";
import { render } from "@testing-library/react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

describe("Multiple Choice Question component test suite", () => {
  test("test render component", () => {
    render(
      <MultipleChoiceQuestion
        question={{
          "question-attempt-id": "some-attempt-id",
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
        }}
      />
    );
  });
});
