import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CompanyDetails } from "./CompanyDetails";
import { CompanySignupStoreProvider } from "../../../../../context/Signup/CompanySignupStoreContext";
import {
  CompanySignupStepProvider
} from "../../../../../context/Signup/CompanySignupStepContext";

describe("Company Details Test", () => {
  beforeEach(() => {
    render(
      <CompanySignupStepProvider>
        <CompanySignupStoreProvider>
          <CompanyDetails />
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

    const firstInputElement = screen.getAllByTestId("inputField")[0];
    expect(firstInputElement).toHaveFocus();
  });

  it("Test if input is valid, no error shows up", () => {
    const nameElement = screen.getByTestId("inputField");
    fireEvent.change(nameElement, {
      target: {
        value: "Arpanet",
      },
    });

    const [companyAddress, companyDescription] = screen.getAllByTestId("textAreaField");
    fireEvent.change(companyAddress, {
      target: {
        value: "Serangoon Road",
      },
    });

    fireEvent.change(companyDescription, {
      target: {
        value: "A really good company"
      }
    })
    

    const errorMessage = screen.queryByText(/Please fill in this field/g);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
