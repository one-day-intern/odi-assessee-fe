import { render, screen } from "@testing-library/react"
import React from "react";
import { SignupChoiceCheck } from "./SignupChoiceCheck";

describe("Signup Choice Check Test", () => {
    it("Signup Choice Check renders unselected properly", () => {
        render(<SignupChoiceCheck isSelected={ false } />);
        const svg = screen.getByTestId("signupChoiceCheck");

        expect(svg).toBeInTheDocument();

    });

    it("Signup Choice Check renders selected properly", () => {
        render(<SignupChoiceCheck isSelected={ true } />);
        const svg = screen.getByTestId("signupChoiceCheck");

        expect(svg).toBeInTheDocument();

    })
})