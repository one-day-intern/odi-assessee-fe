import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneField } from "./PhoneField";

const mockedFunction = jest.fn();

describe("Phone Field Test", () => {
    beforeEach(() => {
        render(<PhoneField label="Phone Field" value="" onChange={ mockedFunction }/>)
    })

    it("Test if element rendered properly", () => {
        const element = screen.getByRole("textbox");
        expect(element).toBeInTheDocument();
    });

    it("Test if change event is fired, function is called", () => {
        const element = screen.getByRole("textbox");
        fireEvent.change(element, {
            target: {
                value: "632321"
            }
        });
        expect(mockedFunction).toBeCalledTimes(1);
    })
})