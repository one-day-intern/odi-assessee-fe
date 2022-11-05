import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Signup } from "./Signup";

describe("Signup Test", () => {
    beforeEach(() => {
        render(<Signup/>)
    });

    it("Signup component renders properly", () => {
        const backdrop = screen.getByTestId("backdrop");
        expect(backdrop).toBeInTheDocument();
    });

    it("Handle event on signup choice click", () => {
        const signupChoices = screen.getAllByTestId("signupChoice");

        let clickedChoice = signupChoices[1];
        fireEvent.click(clickedChoice);

        expect(clickedChoice).toHaveAttribute("style");
    })
});