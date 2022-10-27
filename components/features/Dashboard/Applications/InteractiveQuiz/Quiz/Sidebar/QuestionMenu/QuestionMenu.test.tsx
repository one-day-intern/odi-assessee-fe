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
        const { getByTestId } = render(<QuestionMenu />);
        getByTestId("QuestionMenu")
    })
    test("open question menu", () => {
        const { getByTestId } = render(<QuestionMenu />);
        const menuButton = getByTestId("QuestionMenu").querySelector(".menu-button");

        act(() => {
            fireEvent.mouseDown(menuButton!);
            fireEvent.mouseUp(menuButton!);
        })

        getByTestId("QuestionMenuTab");
    })
})