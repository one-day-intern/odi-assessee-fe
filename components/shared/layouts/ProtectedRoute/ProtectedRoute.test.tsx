import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../../../context/Authentication";
import ProtectedRoute from "./ProtectedRoute";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const mockPush = jest.fn();

describe("Protected Route test suite", () => {
  it("Test if it redirects when user doesn't exist", async () => {
    localStorage.clear();
    render(
      <AuthProvider>
        <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
          <ProtectedRoute>
            <div data-testid="protected">Hello</div>
          </ProtectedRoute>
        </RouterContext.Provider>
      </AuthProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    const hello = screen.queryByTestId("protected");
    expect(hello).not.toBeInTheDocument();

    expect(mockPush).toBeCalledTimes(1);
  });

  it("Test if it stays if user exists", async () => {
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");

    render(
      <AuthProvider>
        <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
          <ProtectedRoute>
            <div data-testid="protected">Hello</div>
          </ProtectedRoute>
        </RouterContext.Provider>
      </AuthProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 500));

    const hello = screen.getByTestId("protected");
    expect(hello).toBeInTheDocument();
  });
});
