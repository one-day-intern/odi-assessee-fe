import React from "react";
import { render } from "@testing-library/react";
import EssayQuestion from "./EssayQuestion";
import DashboardAPIProvider from "../../../../../../../context/Dashboard/DashboardAPIContext";

describe("Essay Question component test suite", () => {
  test("test render component", () => {
    render(
      <EssayQuestion
        question={{
          "question-attempt-id": "some-attempt-id",
          "is-answered": false,
          prompt: "hello",
          "question-type": "text",
          answer: "test",
        }}
        isQuizEnded={false}
      />
    );
  });
});
