import React from "react";
import Dashboard from ".";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { AuthProvider } from "../../../context/Authentication";
import { act } from "react-dom/test-utils";

let mockLocalStorage = {};

class WebkitCSSMatrixMock {
  matrix: DOMMatrix;
  constructor(init?: string | number) {
    this.matrix = { m42: 100, m41: 100 } as unknown as DOMMatrix;
  }
}

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { "assessment-event-id": "dummy-assessment" },
    };
  },
}));
describe("Dashboard test suite", () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    });
    global.Storage.prototype.removeItem = jest.fn(
      (key) => delete mockLocalStorage[key]
    );
    // @ts-ignore
    window.WebKitCSSMatrix = WebkitCSSMatrixMock;
  });

  beforeEach(() => {
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");
  });
  test("testing render dashboard", () => {
    const { getByTestId } = render(<Dashboard />);
    const screenEl = getByTestId("MainScreen");
    const taskbarEl = getByTestId("MainTaskbar");

    expect(screenEl).toHaveAttribute("class", "screen");
    expect(taskbarEl).toHaveAttribute("class", "taskbar");
  });
  test("testing open app", () => {
    const { getByTestId } = render(<Dashboard />);
    const windowContainer = getByTestId("FullscreenBounds");
    const taskbarEl = getByTestId("MainTaskbar");
    const shortcut = taskbarEl.children[1];

    fireEvent.mouseDown(shortcut.firstElementChild!);
    fireEvent.mouseUp(shortcut.firstElementChild!);

    expect(windowContainer.children.length).toBeGreaterThan(0);
  });

  test("testing minimize app", async () => {
    const { getByTestId } = render(<Dashboard />);
    const windowContainer = getByTestId("FullscreenBounds");
    const taskbarEl = getByTestId("MainTaskbar");
    const shortcut = taskbarEl.children[1];

    expect(windowContainer.children.length).toBe(1);

    act(() => {
      fireEvent.mouseDown(shortcut.firstElementChild!);
      fireEvent.mouseUp(shortcut.firstElementChild!);
    });

    expect(windowContainer.children.length).toBe(2);

    const windowHead = getByTestId("window-head");
    const windowMinimizeBtn = windowHead.querySelector(".minimize");

    act(() => {
      fireEvent.click(windowMinimizeBtn!);
    });

    // wait for animation
    await new Promise((resolve) => setTimeout(resolve, 500));
    // fullscreen shadow container and window
    expect(windowContainer.children.length).toBe(2);
  });

  test("testing close app", async () => {
    const { getByTestId } = render(<Dashboard />);
    const windowContainer = getByTestId("FullscreenBounds");
    const taskbarEl = getByTestId("MainTaskbar");
    const shortcut = taskbarEl.children[1];

    act(() => {
      fireEvent.mouseDown(shortcut.firstElementChild!);
      fireEvent.mouseUp(shortcut.firstElementChild!);
    });

    expect(windowContainer.children.length).toBeGreaterThan(0);

    const windowHead = getByTestId("window-head");
    const windowCloseBtn = windowHead.querySelector(".exit");

    act(() => {
      fireEvent.click(windowCloseBtn!);
    })

    // wait for animation
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(windowContainer.children.length).toBe(1);
  });
  test("testing server sent notifications", async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const notificationButton = getByTestId(
      "NotificationViewerShortcut"
    ).firstElementChild;

    expect(notificationButton).toBeTruthy();

    act(() => {
      fireEvent.mouseDown(notificationButton!);
      fireEvent.mouseUp(notificationButton!);
    });

    const notificationViewer = getByTestId("NotificationViewer");

    expect(notificationViewer.children.length).toBe(1);

    act(() => {
        fireEvent.click(notificationViewer.firstElementChild!);
    })
  });
});
