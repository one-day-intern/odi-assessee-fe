import React from "react";
import Sidebar from "./Sidebar"
import { render } from "@testing-library/react";

let spy: jest.SpyInstance;

beforeAll(() => {
    spy = jest.spyOn(document, "getElementById");
    const container = document.createElement("div");
    document.body.appendChild(container);
    spy.mockReturnValue(container)
})

describe("Sidebar component test suite", () => {
    test("render component", () => {
        const { getByTestId } = render(<Sidebar />);
        getByTestId("QuizSidebar")
    })
})