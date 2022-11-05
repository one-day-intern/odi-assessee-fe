import { screen, render } from "@testing-library/react";
import React from "react";
import { Loader } from "./Loader";

describe("Loader test suite", () => {
    it("Test if loader renders properly", () => {
        render(<Loader/>);

        const loader = screen.getByTestId("loader");
        expect(loader).toBeInTheDocument();
    })
})