import React from "react";
import InteractiveQuiz from "./InteractiveQuiz"
import { render } from "@testing-library/react";

describe("InteractiveQuiz component test suite", () => {
    test("render component", () => {
        const { getByTestId } = render(<InteractiveQuiz/>);
        getByTestId("InteractiveQuiz")
    })
})