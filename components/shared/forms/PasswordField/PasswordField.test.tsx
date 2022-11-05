import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { PasswordField } from "./PasswordField";

const mockedFunction = jest.fn();

describe("Password Field Test", () => {
  beforeEach(() => {
    render(
      <PasswordField label="label" value="value" onChange={mockedFunction} />
    );
  });

  it("Test if password field renders properly", () => {
    const passwordElement = screen.getByTestId("password-wrapper");
    const openedEye = screen.getByTestId("eye-open");

    expect(passwordElement).toBeInTheDocument();
    expect(openedEye).toBeInTheDocument();
  });

  it("Test if password is revealed when eye button is clicked", () => {
    let openedEye = screen.getByTestId("eye-open");
    fireEvent.click(openedEye);

    const passwordInput = screen.getByTestId("password-input");
    const closedEye = screen.getByTestId("eye-closed");

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(openedEye).not.toBeInTheDocument();
    expect(closedEye).toBeInTheDocument();

    fireEvent.click(closedEye);
    openedEye = screen.getByTestId("eye-open");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(openedEye).toBeInTheDocument();
    expect(closedEye).not.toBeInTheDocument();
  });

  it("Test if input is focused, a border will show", () => {
    const passwordElement = screen.getByTestId("password-wrapper");
    const passwordInput = screen.getByTestId("password-input");

    expect(passwordElement).not.toHaveAttribute("style");

    fireEvent.focus(passwordInput);

    expect(passwordElement).toHaveAttribute("style");
  });

  it("Test if on change handler function called", () => {
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, {
        target: {
            value: "1234"
        }
    });

    expect(mockedFunction).toBeCalledTimes(1);
  })
});
