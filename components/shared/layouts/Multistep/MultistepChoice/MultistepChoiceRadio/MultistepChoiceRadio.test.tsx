import React from "react";
import { render, screen } from "@testing-library/react"

import { MultistepChoiceRadio } from ".";

describe("Multiple Choice Radio Test", () => {
    it("Test if properly rendered when disabled not selected", () => {
        render(<MultistepChoiceRadio disabled={ true } isSelected={ false }/>);
        
        const choiceRadio = screen.getByTestId("border-circle");
        expect(choiceRadio).toHaveAttribute("stroke", "#808080");

        const choiceInner = screen.getByTestId("inner-circle");
        expect(choiceInner).toHaveAttribute("stroke", "#808080");;
        expect(choiceInner).toHaveAttribute("r", "0");
    });


    it("Test if properly rendered when not disabled not selected", () => {
        render(<MultistepChoiceRadio disabled={ false } isSelected={ false }/>);
        
        const choiceRadio = screen.getByTestId("border-circle");
        expect(choiceRadio).toHaveAttribute("stroke", "#3D65D8");

        const choiceInner = screen.getByTestId("inner-circle");
        expect(choiceInner).toHaveAttribute("stroke", "#3D65D8");;
        expect(choiceInner).toHaveAttribute("r", "0");
    })


    it("Test if properly rendered when not disabled and selected", () => {
        render(<MultistepChoiceRadio disabled={ false } isSelected={ true }/>);
        
        const choiceRadio = screen.getByTestId("border-circle");
        expect(choiceRadio).toHaveAttribute("stroke", "#3D65D8");

        const choiceInner = screen.getByTestId("inner-circle");
        expect(choiceInner).toHaveAttribute("stroke", "#3D65D8");;
        expect(choiceInner).toHaveAttribute("r", "11");
    })
})