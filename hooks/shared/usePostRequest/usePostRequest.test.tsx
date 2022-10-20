import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthProvider } from "../../../context/Authentication";
import usePostRequest from "./usePostRequest";
import React, { ReactNode } from "react";

interface MockResponse {
  message: string;
}

let mockLocalStorage = {};

interface HOCProps {
  children: ReactNode;
}

const AuthContextWrapper = ({ children }: HOCProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe("usePostRequest test", () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    });
    global.Storage.prototype.removeItem = jest.fn(
      (key) => delete mockLocalStorage[key]
    );
  });

  beforeEach(() => {
    mockLocalStorage = {};
  });

  it("Hook renders properly", () => {
    const { result } = renderHook(() => usePostRequest("/route/unprotected/", {}));
    expect(result.current).toBeDefined();
  });

  it("Hook called when posting unprotected routes", async () => {
    const { result } = renderHook(() =>
      usePostRequest<MockResponse, MockResponse>("/route/unprotected-post/", {
        message: "rashad aziz"
      }, {
        requiresToken: false
      })
    );

    act(() => {
      result.current.postData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.data?.message).toBe("Unprotected route posted");
  });

  it("Hook called when posting unprotected routes on error", async () => {
    const { result } = renderHook(() =>
      usePostRequest<MockResponse, MockResponse>("/route/unprotected-post-error/", {
        message: "rashad aziz"
      }, {
        requiresToken: false
      })
    );

    act(() => {
      result.current.postData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.error?.message).toBe("Error unprotected route posted");
  });

  it("Hook called when posting protected routes on success", async () => {
    const { result } = renderHook(() =>
      usePostRequest<MockResponse, MockResponse>("/route/protected-post/", {
        message: "rashad aziz"
      }, {
        requiresToken: true
      }), { wrapper: AuthContextWrapper }
    );

    act(() => {
      result.current.postData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.data?.message).toBe("Protected route posted");
  });

  it("Hook called when posting protected routes on error", async () => {
    const { result } = renderHook(() =>
      usePostRequest<MockResponse, MockResponse>("/route/protected-post/error/", {
        message: "rashad aziz"
      }, {
        requiresToken: true
      }), { wrapper: AuthContextWrapper }
    );

    act(() => {
      result.current.postData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.error?.message).toBe("Error protected route posted");
  });

 
});
