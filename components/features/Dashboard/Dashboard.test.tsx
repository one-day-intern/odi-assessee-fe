import React from "react";
import Dashboard from ".";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

class WebkitCSSMatrixMock {
  matrix: DOMMatrix;
  constructor(init?: string | number) {
    this.matrix = { m42: 100, m41: 100 } as unknown as DOMMatrix;
  }
}

describe("Dashboard test suite", () => {
  beforeAll(() => {
    // @ts-ignore
    window.WebKitCSSMatrix = WebkitCSSMatrixMock;
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
});
