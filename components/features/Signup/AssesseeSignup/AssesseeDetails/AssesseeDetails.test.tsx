import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AssesseeDetails } from "./AssesseeDetails";

import { AssesseeSignupStoreProvider } from "../../../../../context/Signup/AssesseeSignupStoreContext";
import { AssesseeSignupStepProvider } from "../../../../../context/Signup/AssesseeSignupStepContext";

describe("Assessee Details Test", () => {
  beforeEach(() => {
    render(
      <AssesseeSignupStepProvider>
        <AssesseeSignupStoreProvider>
          <AssesseeDetails />
        </AssesseeSignupStoreProvider>
      </AssesseeSignupStepProvider>
    );
  });

  it("Test if element renders properly", () => {
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  it("Test if when input is invalid, first element is focused", () => {
    const button = screen.getByTestId("button");
    fireEvent.click(button);

    const firstInputElement = screen.getAllByTestId("inputField")[0];
    expect(firstInputElement).toHaveFocus();
  });

  it("Test if input is valid, no error shows up", () => {
    const [fNameElement, lastNameElement, dateOfBirth] =
      screen.getAllByTestId("inputField");
    fireEvent.change(fNameElement, {
      target: {
        value: "Rashad",
      },
    });
    fireEvent.change(lastNameElement, {
      target: {
        value: "Aziz",
      },
    });

    fireEvent.change(dateOfBirth, {
      target: {
        value: "2021-11-10",
      },
    });
    const errorMessage = screen.queryByText(/Please fill in this field/g);
    expect(errorMessage).not.toBeInTheDocument();
  });
  
});
