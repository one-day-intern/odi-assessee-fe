import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"

import { SignupChoice } from "./SignupChoice"

const mockedFunction = jest.fn(() => console.log("Mock Click"));

describe("Signup Choice Test", () => {
    it("Signup Choice renders unselected properly", () => {
        render(<SignupChoice onClick={ mockedFunction } isSelected={ false } mainAction="Rashad" description="Jo"/>)
        const signupChoice = screen.getByTestId("signupChoice");
        expect(signupChoice).toBeInTheDocument();
        expect(signupChoice).toHaveAttribute("style", "box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.5);");
    });

    it("Signup Choice renders selected properly", () => {
        render(<SignupChoice onClick={ mockedFunction } isSelected={ true } mainAction="Rashad" description="Jo"/>)
        const signupChoice = screen.getByTestId("signupChoice");
        expect(signupChoice).toBeInTheDocument();
        expect(signupChoice).toHaveAttribute("style", "box-shadow: 0px 0px 0px 2px #9076C0;");
    });

    it("Signup Choice calls mocked function when clicked", () => {
        render(<SignupChoice onClick={ mockedFunction } isSelected={ false } mainAction="Rashad" description="Jo"/>)
        const signupChoice = screen.getByTestId("signupChoice");
        fireEvent.click(signupChoice);

        expect(mockedFunction).toHaveBeenCalledTimes(1);
    })
})