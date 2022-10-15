import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { useAuthContext, AuthProvider } from "./index";
import { AuthDispatchTypes } from "./AuthDispatchTypes";
import { act } from "react-dom/test-utils";

const MockAuthPChildrenValue = () => {
  const { user, accessToken, refreshToken, remember, dispatch } =
    useAuthContext();

  return (
    <div>
      <p data-testid="access">{accessToken}</p>
      <p data-testid="refresh">{refreshToken}</p>
      <p data-testid="user">{user}</p>
      <button
        data-testid="login"
        onClick={() =>
          dispatch({
            type: AuthDispatchTypes.LOGIN,
            payload: {
              accessToken: "access",
              refreshToken: "refresh",
              user: "user",
              remember: !remember,
            },
          })
        }
      ></button>
      <button
        data-testid="logout"
        onClick={() => dispatch({ type: AuthDispatchTypes.LOGOUT })}
      ></button>
      <button
        data-testid="default"
        onClick={() => dispatch({ type: 3 })}
      ></button>
    </div>
  );
};

describe("AuthContext test", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <MockAuthPChildrenValue />
      </AuthProvider>
    );
  });

  it("Test login", () => {
    const login = screen.getByTestId("login");

    fireEvent.click(login);

    const access = screen.getByTestId("access");
    expect(access).toHaveTextContent("access");
  });

  it("Test logout", () => {
    const logout = screen.getByTestId("logout");

    fireEvent.click(logout);

    const access = screen.getByTestId("access");
    expect(access).toHaveTextContent("");
  });

  it("Test default", () => {
    const smthElse = screen.getByTestId("default");

    fireEvent.click(smthElse);

    const access = screen.getByTestId("access");
    expect(access).toHaveTextContent("");
  });
});
