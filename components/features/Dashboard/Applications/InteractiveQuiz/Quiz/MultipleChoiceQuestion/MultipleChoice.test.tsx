import React from "react";
import { render } from "@testing-library/react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

describe("Multiple Choice Question component test suite", () => {
    test("test render component", () => {
        render(<MultipleChoiceQuestion />);
    })
})