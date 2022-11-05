import { render, screen } from "@testing-library/react"
import React from "react";
import { OdiLogo } from "./OdiLogo";

describe("Odi Logo Test", () => {
    it("Test if logo renders properly", () => {
        render(<OdiLogo/>);

        const logo = screen.getByTestId("odilogo");
        expect(logo).toBeInTheDocument();
    })
})