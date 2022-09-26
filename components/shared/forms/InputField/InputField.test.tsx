import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputField } from "./InputField";

const mockedFunction = jest.fn();

describe("Input element test", () => {
    beforeEach(() => {
        render(
            <InputField label="email" value="" onChange={ mockedFunction }/>
        )
    });

    it("Test if input field render properly", () => {
        const inputElement = screen.getByTestId("inputField");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toHaveAttribute("style");
    });

    it("Test if input field respond to change event", () => {
        const inputElement = screen.getByTestId("inputField");
        fireEvent.change(inputElement, { target: {
            value: "hello"
        }});

        expect(mockedFunction).toBeCalledTimes(1);
    });
})