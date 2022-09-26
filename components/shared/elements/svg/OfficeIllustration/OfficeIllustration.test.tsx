import { render, screen } from "@testing-library/react";
import { OfficeIllustration } from "./OfficeIllustration";
import React from "react";

describe("Office Illustration Test", () => {
  it("Office Illustration renders properly", () => {
    render(<OfficeIllustration />);
    const officeIllustration = screen.getByTestId("officeIllustration");
    expect(officeIllustration).toBeInTheDocument();
  });
});
