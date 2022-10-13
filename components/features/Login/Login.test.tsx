import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "./Login";

describe("Login Details Test", () => {
    beforeEach(() => {
        render(<Login/>);
    });

    it("Test if element renders properly", () => {
        const backdrop = screen.getByTestId("backdrop");
        expect(backdrop).toBeInTheDocument();
    });

    it("Test if error shows when button is clicked", () => {
        const button = screen.getByTestId("button");

        const emailInput = screen.getByTestId("inputField");
        fireEvent.change(emailInput, {
            target: {
                value: "abc@abc.com"
            }
        })
        
        const passwordInput = screen.getByTestId("password-input");
        fireEvent.change(passwordInput, {
            target: {
                value: "Abca123@@"
            }
        })

        fireEvent.click(button);

        const errorMessage = screen.queryByText(/Please fill in this field/g);
        expect(errorMessage).not.toBeInTheDocument();
    });

});