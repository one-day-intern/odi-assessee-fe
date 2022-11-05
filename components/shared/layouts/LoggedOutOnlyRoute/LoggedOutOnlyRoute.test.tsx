import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../../../context/Authentication";
import LoggedOutOnlyRoute from "./LoggedOutOnlyRoute";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const mockPush = jest.fn();

describe("Protected Route test suite", () => {
  it("Test if it stays if user doesn't exists", async () => {
    render(
      <AuthProvider>
        <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
          <LoggedOutOnlyRoute>
            <div data-testid="protected">Hello</div>
          </LoggedOutOnlyRoute>
        </RouterContext.Provider>
      </AuthProvider>
    );
    const hello = screen.queryByTestId("protected");
    expect(hello).not.toBeInTheDocument();
  });

  it("Test if it redirects when user does exist", async () => {
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");

    render(
      <AuthProvider>
        <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
          <LoggedOutOnlyRoute>
            <div data-testid="protected">Hello</div>
          </LoggedOutOnlyRoute>
        </RouterContext.Provider>
      </AuthProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const hello = screen.queryByTestId("protected");
    expect(hello).not.toBeInTheDocument();
  });
});
