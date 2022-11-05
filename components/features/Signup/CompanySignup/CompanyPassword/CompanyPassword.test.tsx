import { render, screen, fireEvent } from "@testing-library/react";
import { CompanyPassword } from "./CompanyPassword";
import React from "react";
import { CompanySignupStoreProvider } from "../../../../../context/Signup/CompanySignupStoreContext";
import { CompanySignupStepProvider } from "../../../../../context/Signup/CompanySignupStepContext";

describe("Company Password Test", () => {
  beforeEach(() => {
    render(
      <CompanySignupStepProvider>
        <CompanySignupStoreProvider>
          <CompanyPassword />
        </CompanySignupStoreProvider>
      </CompanySignupStepProvider>
    );
  });

  it("Test if element renders properly", () => {
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  it("Test if when input is invalid, first element is focused", () => {
    const button = screen.getByTestId("button");
    fireEvent.click(button);

    const firstInputElement = screen.getByTestId("inputField");
    expect(firstInputElement).toHaveFocus();
  });

  it("Test if confirmed password is empty, error shows up", () => {
    const [passwordElement, confirmedPasswordElement] = screen.getAllByTestId("password-input");
    fireEvent.change(passwordElement, {
      target: {
        value: "aaAA1123",
      },
    });
    fireEvent.change(confirmedPasswordElement, {
      target: {
        value: "",
      },
    });

    const errorMessage = screen.queryByText(/Please fill in this field./g);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("Test if input is valid, no error shows up", () => {
    const [passwordElement, confirmedPasswordElement] = screen.getAllByTestId("password-input");
    fireEvent.change(passwordElement, {
      target: {
        value: "aaAA1123",
      },
    });
    fireEvent.change(confirmedPasswordElement, {
      target: {
        value: "aaAA1123",
      },
    });

    const errorMessage = screen.queryByText(/Please fill in this field/g);
    expect(errorMessage).not.toBeInTheDocument();
  });

});
