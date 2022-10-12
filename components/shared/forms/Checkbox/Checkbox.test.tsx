import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import { Checkbox } from "./Checkbox";

const mockedFunction = jest.fn();

describe("Checkbox test", () => {
    beforeEach(() => {
        render(<Checkbox setIsChecked={mockedFunction} label="Daadoodaa" isChecked={false}/>)
    });

    it("Test if element rendered properly", () => {
        const checkboxElement = screen.getByTestId("checkbox");
        expect(checkboxElement).toBeInTheDocument();
    });

    it("Test if when element is clicked", () => {
        const checkboxElement = screen.getByTestId("checkbox");
        fireEvent.click(checkboxElement);
        expect(mockedFunction).toBeCalledTimes(1);
    })
});