import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import { AuthProvider } from "../../../context/Authentication";
import { act } from "react-dom/test-utils";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

const fakePush = jest.fn();

describe("Login Details Test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>

      <AuthProvider>
        <Login />
      </AuthProvider>
      </RouterContext.Provider>
    );
  });

  it("Test if element renders properly", () => {
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  it("Test if error shows when button is clicked", async () => {
    const button = screen.getByTestId("button");

    const emailInput = screen.getByTestId("inputField");
    fireEvent.change(emailInput, {
      target: {
        value: "abc@abc.com",
      },
    });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, {
      target: {
        value: "Abca123@@",
      },
    });

    act(() => {
      fireEvent.click(button);
    });

    const errorMessage = screen.queryByText(/Please fill in this field/g);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
