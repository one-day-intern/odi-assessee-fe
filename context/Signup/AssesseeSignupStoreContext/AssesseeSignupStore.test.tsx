import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {
  useAssesseeSignupStoreContext,
  AssesseeSignupStoreProvider,
} from "./index";
import {
  AssesseeSignupStepProvider,
  useAssesseeSignupStepContext,
} from "../AssesseeSignupStepContext";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

const MockCSSPChildrenValue = () => {
  const { data, setValue } = useAssesseeSignupStoreContext();

  return (
    <div>
      <p data-testid="email">{data.email}</p>
      <button onClick={() => setValue("email", "a@a.com")}></button>
    </div>
  );
};

const MockCSSPChildrenError = () => {
  const { errors, setError } = useAssesseeSignupStoreContext();

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
  const { forms } = useAssesseeSignupStepContext();
  const { postResult, setError } = useAssesseeSignupStoreContext();

  return (
    <div>
      <p data-testid="firstForm">{forms[0].isSelected}</p>
      <button
        data-testid="setError"
        onClick={() => setError("first_name", "An error have occured. :(")}
      ></button>
      <button data-testid="postResult" onClick={() => postResult()}></button>
    </div>
  );
};

const mockPush = jest.fn();

describe("Company Signup Store Provider Test", () => {
  it("Test change value", () => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AssesseeSignupStoreProvider>
          <MockCSSPChildrenValue />
        </AssesseeSignupStoreProvider>
      </RouterContext.Provider>
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
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AssesseeSignupStoreProvider>
          <MockCSSPChildrenError />
        </AssesseeSignupStoreProvider>
      </RouterContext.Provider>
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
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AssesseeSignupStepProvider>
          <AssesseeSignupStoreProvider>
            <MockCSSPChildrenPostResult />
          </AssesseeSignupStoreProvider>
        </AssesseeSignupStepProvider>
      </RouterContext.Provider>
    );

    const setErrorButton = screen.getByTestId("setError");
    fireEvent.click(setErrorButton);

    const postResultButton = screen.getByTestId("postResult");
    fireEvent.click(postResultButton);

    const firstForm = screen.getByTestId("firstForm");
    expect(firstForm).toHaveTextContent("");
  });
});
