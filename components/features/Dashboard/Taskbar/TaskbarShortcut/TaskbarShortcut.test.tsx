import React from "react";
import TaskbarShortcut from "./TaskbarShortcut";
import { render } from "@testing-library/react";

describe("Dashboard Taskbar Shortcut component test suite", () => {
  test("testing taskbar shorcut render", () => {
    const { getByTestId } = render(<TaskbarShortcut />);
    getByTestId("Shortcut");
  });

  test("testing taskbar shortcut opened render", () => {
    const { getByTestId } = render(<TaskbarShortcut opened={true} />);
    getByTestId("ShortcutIconOverlay");
  });

  test("testing taskbar shortcut opened focused render", () => {
    const { getByTestId } = render(<TaskbarShortcut opened={true} focused={true} />);
    const shortcut = getByTestId("Shortcut");
    const overlay = getByTestId("ShortcutIconOverlay");

    expect(shortcut.classList).toContain("hovered");
    expect(overlay.style.backgroundColor).toBe("rgb(37, 150, 190)")
  })
});
