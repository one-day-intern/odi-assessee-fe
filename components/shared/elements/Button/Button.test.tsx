import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import { Button } from "./Button";

const mockedFunction = jest.fn();

describe("Button element test -- primary", () => {
  beforeEach(() =>
    render(
      <Button variant="primary" onClick={mockedFunction}>
        Hello
      </Button>
    )
  );

  it("Test if element rendered properly", () => {
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("class", "button button--primary")
  });

  it("Test if event fired when clicked", () => {
    const buttonElement = screen.getByTestId("button");
    fireEvent.click(buttonElement);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  })
});

describe("Button element test -- secondary", () => {
  it("Test if element rendered properly", () => {
    render(<Button variant="secondary" onClick={ mockedFunction }>Hello</Button>);
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("class", "button button--secondary")
  })
})

