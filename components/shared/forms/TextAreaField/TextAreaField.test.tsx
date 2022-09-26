import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextAreaField } from "./TextAreaField";

const mockedFunction = jest.fn();

describe("Input element test", () => {
    beforeEach(() => {
        render(
            <TextAreaField label="email" defaultValue="Test" onChange={ mockedFunction }/>
        )
    });

    it("Test if input field render properly", () => {
        const inputElement = screen.getByTestId("textAreaField");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toHaveAttribute("style");
    });

    it("Test if input field respond to change event", () => {
        const inputElement = screen.getByTestId("textAreaField");
        fireEvent.change(inputElement, { target: {
            value: "hello"
        }});

        expect(mockedFunction).toBeCalledTimes(1);
    });
})