import React from "react";
import { render, screen } from "@testing-library/react";
import { DateField } from "./DateField";

const mockedFunction = jest.fn();

describe("Input element test", () => {
    beforeEach(() => {
        render(
            <DateField label="email" value="" onChange={ mockedFunction }/>
        )
    });

    it("Test if input field render properly", () => {
        const dateElement = screen.getByTestId("inputField");
        expect(dateElement).toBeInTheDocument();
    });
})