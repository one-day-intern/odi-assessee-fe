import React from "react";
import { render, screen } from "@testing-library/react";

import { CompanySignupWrapper } from "./CompanySignupWrapper"

describe("Company Signup Page Test", () => {
  it("Test if element rendered properly", () => {
    render(<CompanySignupWrapper/>);
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });
});
