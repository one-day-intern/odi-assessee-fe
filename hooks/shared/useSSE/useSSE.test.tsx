import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthProvider } from "../../../context/Authentication";
import useSSE, { CONNECTION_STATE } from "./useSSE";

let mockLocalStorage = {};

describe("useSSE hook test suite", () => {
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
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");
  });

  test("testing subscribe", async () => {
    const { result } = renderHook(
      () =>
        useSSE(
          `/assessment/assessment-event/subscribe/?assessment-event-id=testing`
        ),
      { wrapper: AuthProvider }
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(result.current.connectionState).toBe(CONNECTION_STATE.OPENED);
  });
  test("testing unsubscribe", async () => {
    const { result } = renderHook(
      () =>
        useSSE(
          `/assessment/assessment-event/subscribe/?assessment-event-id=testing`
        ),
      { wrapper: AuthProvider }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(result.current.connectionState).toBe(CONNECTION_STATE.OPENED);

    act(() => {
      result.current.unsubscribeFromServer();
    });
    expect(result.current.connectionState).toBe(CONNECTION_STATE.CLOSED);
  });
  test("testing onMessage change", async () => {
    let dataReceived: Object | undefined = undefined;
    const { result } = renderHook(
      () =>
        useSSE(
          `/assessment/assessment-event/subscribe/?assessment-event-id=testing`,
          {
            onMessage: (data) => {
              dataReceived = JSON.parse(data);
            },
          }
        ),
      { wrapper: AuthProvider }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(result.current.connectionState).toBe(CONNECTION_STATE.OPENED);

    expect(typeof dataReceived).toBe("object");
  });
  test("testing no retry on error", async () => {
    const { result } = renderHook(
      () =>
        useSSE(
          `/assessment/assessment-event/subscribe/?assessment-event-id=serverError`,
          { retryOnError: false }
        ),
      { wrapper: AuthProvider }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(result.current.connectionState).toBe(CONNECTION_STATE.ERROR);
  });
  test("testing auth error", async () => {
    const { result } = renderHook(
      () =>
        useSSE(
          `/assessment/assessment-event/subscribe/?assessment-event-id=authError`,
          { retryOnError: false }
        ),
      { wrapper: AuthProvider }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(result.current.connectionState).toBe(CONNECTION_STATE.OPENED);
  });
});
