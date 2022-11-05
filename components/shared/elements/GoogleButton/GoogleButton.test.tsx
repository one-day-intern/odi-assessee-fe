import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import { GoogleButton } from "./GoogleButton";

const mockedFunction = jest.fn();

describe("Google button element", () => {
  beforeEach(() => render(<GoogleButton onClick={mockedFunction} />));

  it("Test if element rendered properly", () => {
    const buttonElement = screen.getByTestId("google-btn");
    expect(buttonElement).toBeInTheDocument();
  });

  it("Test if event fired when clicked", () => {
    const buttonElement = screen.getByTestId("google-btn");
    fireEvent.click(buttonElement);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
