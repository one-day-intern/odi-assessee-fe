import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthProvider } from "../../../context/Authentication";
import useGetRequest from "./useGetRequest";
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

describe("useGetRequest test", () => {
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
    const { result } = renderHook(() => useGetRequest("/route/unprotected/"));
    expect(result.current).toBeDefined();
  });

  it("Hook called when fetching unprotected data", async () => {
    const { result } = renderHook(() =>
      useGetRequest<MockResponse>("/route/unprotected/", {
        requiresToken: false,
        useCache: false,
      })
    );

    act(() => {
      result.current.fetchData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.data?.message).toBe("Unprotected route accessed");
  });

  it("Hook called when fetching unprotected data without calling fetchData", async () => {
    const { result } = renderHook(() =>
      useGetRequest<MockResponse>("/route/unprotected/", {
        requiresToken: false,
        useCache: false,
      })
    );

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.data?.message).toBe("Unprotected route accessed");
  });

  it("Hook called when fetching unprotected error", async () => {
    const { result } = renderHook(() =>
      useGetRequest<MockResponse>("/route/unprotected-error/", {
        requiresToken: false,
        useCache: false,
      })
    );

    act(() => {
      result.current.fetchData!();
    });

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.error?.message).toBe(
      "Error unprotected route accessed"
    );
  });

  it("Hook called when fetching protected data with token", async () => {
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");

    const hook = renderHook(
      () =>
        useGetRequest<MockResponse>("/route/protected/", {
          requiresToken: true,
          useCache: false,
        }),
      { wrapper: AuthContextWrapper }
    );

    act(() => {
     hook.result.current.fetchData!() 
    })

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(hook.result.current.data?.message).toBe("Protected route accessed");
  });

  it("Hook called when fetching protected data without token", async () => {

    const hook = renderHook(
      () =>
        useGetRequest<MockResponse>("/route/protected/", {
          requiresToken: true,
          useCache: false,
        }),
      { wrapper: AuthContextWrapper }
    );

    act(() => {
     hook.result.current.fetchData!() 
    })

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(hook.result.current.data?.message).toBe("Protected route accessed");
  });

  it("Hook called when fetching protected data error without token", async () => {

    const hook = renderHook(
      () =>
        useGetRequest<MockResponse>("/route/protected/error/", {
          requiresToken: true,
          useCache: false,
        }),
      { wrapper: AuthContextWrapper }
    );

    act(() => {
     hook.result.current.fetchData!() 
    })

    // Wait for fetch call to resolve
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(hook.result.current.error?.message).toBe("Error protected route accessed");
  });
});
