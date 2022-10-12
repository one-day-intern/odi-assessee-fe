import { render, screen } from "@testing-library/react";
import React from "react";
import { LoginDivider } from "./LoginDivider";

describe("Login Divider Test", () => {
    it("Login divider renders properly", () => {
        render(<LoginDivider/>);
        const loginDivider = screen.getByTestId("login-divider");
        expect(loginDivider).toBeInTheDocument();
    })
});