import { screen, render } from "@testing-library/react";
import React from "react";
import GoogleLogo from "./GoogleLogo";

describe("Google Logo", () => {
    it("Test if element rendered properly", () => {
        render(<GoogleLogo/>)
        const logoElement = screen.getByTestId("google-logo");
        expect(logoElement).toBeInTheDocument();
    });
});