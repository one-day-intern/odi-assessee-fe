import { render, screen } from "@testing-library/react"
import React from "react";
import { SigninNotice } from "./SigninNotice";

describe("Signin Notice Test", () => {
    it("Signin notice renders properly", () => {
        render(<SigninNotice/>);
        const signinNoticeElement = screen.getByTestId("signinNotice");
        expect(signinNoticeElement).toBeInTheDocument();
    })
})