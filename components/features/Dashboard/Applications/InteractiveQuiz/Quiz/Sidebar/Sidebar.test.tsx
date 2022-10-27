import React from "react";
import Sidebar from "./Sidebar"
import { render } from "@testing-library/react";

describe("Sidebar component test suite", () => {
    test("render component", () => {
        const { getByTestId } = render(<Sidebar />);
        getByTestId("QuizSidebar")
    })
})