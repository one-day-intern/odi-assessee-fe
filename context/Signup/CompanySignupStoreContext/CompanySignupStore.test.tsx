import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useCompanySignupStoreContext } from "./useCompanySignupStoreContext";
import { CompanySignupStoreProvider } from "./CompanySignupStoreProvider";

const MockCSSPChildrenValue = () => {
  const { data, setValue } = useCompanySignupStoreContext();

  return (
    <div>
      <p data-testid="email">{data.email}</p>
      <button onClick={() => setValue("email", "a@a.com")}></button>
    </div>
  );
};

const MockCSSPChildrenError = () => {
  const { errors, setError } = useCompanySignupStoreContext();

  return (
    <div>
      <p data-testid="email">{errors.email}</p>
      <button onClick={() => setError("email", "An error have occured. :(")}></button>
    </div>
  );
}

describe("Company Signup Store Provider Test", () => {
  it("Test change value", () => {
    render(
      <CompanySignupStoreProvider>
        <MockCSSPChildrenValue />
      </CompanySignupStoreProvider>
    );

    let email = screen.getByTestId("email");
    expect(email).toHaveTextContent("");
    
    const button = screen.getByRole("button");
    fireEvent.click(button);

    email = screen.getByTestId("email");
    expect(email).toHaveTextContent(/a@a.com/g)

  });

  it("Test change error", () => {
    render(
      <CompanySignupStoreProvider>
        <MockCSSPChildrenError />
      </CompanySignupStoreProvider>
    );

    let email = screen.getByTestId("email");
    expect(email).toHaveTextContent("");
    
    const button = screen.getByRole("button");
    fireEvent.click(button);

    email = screen.getByTestId("email");
    expect(email).toHaveTextContent(/An error have occured./g)

  });
});
