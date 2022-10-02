import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useCompanySignupStoreContext } from "./useCompanySignupStoreContext";
import { CompanySignupStoreProvider } from "./CompanySignupStoreProvider";
import {
  CompanySignupStepProvider,
  useCompanySignupStepContext,
} from "../CompanySignupStepContext";

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
      <button
        onClick={() => setError("email", "An error have occured. :(")}
      ></button>
    </div>
  );
};

const MockCSSPChildrenPostResult = () => {
  const { forms } = useCompanySignupStepContext();
  const { postResult, setError } = useCompanySignupStoreContext();

  return (
    <div>
      <p data-testid="firstForm">{forms[0].isSelected}</p>
      <button
        data-testid="setError"
        onClick={() => setError("company_name", "An error have occured. :(")}
      ></button>
      <button data-testid="postResult" onClick={() => postResult()}></button>
    </div>
  );
};

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
    expect(email).toHaveTextContent(/a@a.com/g);
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
    expect(email).toHaveTextContent(/An error have occured./g);
  });

  it("Test post result", () => {
    render(
      <CompanySignupStepProvider>
        <CompanySignupStoreProvider>
          <MockCSSPChildrenPostResult />
        </CompanySignupStoreProvider>
      </CompanySignupStepProvider>
    );

    const setErrorButton = screen.getByTestId("setError");
    fireEvent.click(setErrorButton);

    const postResultButton = screen.getByTestId("postResult");
    fireEvent.click(postResultButton);

    const firstForm = screen.getByTestId("firstForm");
    expect(firstForm).toHaveTextContent("");
  });
});
