import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CompanyDescription } from "./CompanyDescription";
import { CompanySignupStoreProvider } from "../../../../../context/Signup/CompanySignupStoreContext";
import { CompanySignupStepProvider } from "../../../../../context/Signup/CompanySignupStepContext";

describe("Company Description Test", () => {
  beforeEach(() => {
    render(
      <CompanySignupStepProvider>
        <CompanySignupStoreProvider>
          <CompanyDescription />
        </CompanySignupStoreProvider>
      </CompanySignupStepProvider>
    );
  });

  it("Test if company description renders properly", () => {
    const odiLogo = screen.getByTestId("odilogo");
    const descForm = screen.getByTestId("descform");

    expect(odiLogo).toBeInTheDocument();
    expect(descForm).toBeInTheDocument();
  });

  it("Test if textfield is empty, button contains skip", () => {
    const buttonHeading = screen.getByTestId("buttonheading");
    expect(buttonHeading).toHaveTextContent(/Skip/g);
  });

  it("Test if textfield is not empty, button contains next", () => {
    const descriptionField = screen.getByTestId("textAreaField");
    fireEvent.change(descriptionField, {
      target: {
        value: "Company Description",
      },
    });

    const buttonHeading = screen.getByTestId("buttonheading");
    expect(buttonHeading).toHaveTextContent(/Next/g);
  });

  it("Test click event on button", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  })
});
