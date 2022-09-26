import React from "react";

import { render, screen } from "@testing-library/react";
import { Backdrop } from "./Backdrop";

describe("Backdrop test", () => {
  it("Backdrop renders properly", () => {
    render(<Backdrop>Hello</Backdrop>);

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });
});
