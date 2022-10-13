import React from "react";
import { render, screen } from "@testing-library/react";

import { AssesseeSignupWrapper } from "./AssesseeSignupWrapper"

describe("Assessee Signup Page Test", () => {
  it("Test if element rendered properly", () => {
    render(<AssesseeSignupWrapper/>);
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });
});
