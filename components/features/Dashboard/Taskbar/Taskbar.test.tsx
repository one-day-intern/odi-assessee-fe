import React from "react";
import Taskbar from "./Taskbar";
import { fireEvent, render } from "@testing-library/react";

const applications = [
  {
    appId: "counter",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 0,
    currentY: 0,
    fullscreen: false,
    reveal: false,
    minimized: false,
    zIndex: 0,
  },
];

const dummyVirtualDesktop = {
  applications: applications,
  openedApps: [],
  numberOfMinimizedApps: 0,
  openApp: function (app) {
    if (!this.openedApps.find((_app) => _app.appId === app.appID)) {
      this.openedApps.push(app);
    }
  },
  closeApp: () => {},
  focusApp: () => {},
  toggleReveal: () => {},
  updateAppPosition: () => {},
  updateAppSize: () => {},
  toggleFullscreen: () => {},
  toggleMinimize: () => {},
};

describe("Dashboard Taskbar component test suite", () => {
  beforeEach(() => {
    dummyVirtualDesktop.openedApps = [];
  });
  
  test("testing taskbar render", () => {
    const { getByTestId } = render(
      <Taskbar isNotificationViewerOpen={false} onNotificationViewerOpen={() => {}} height={50} virtualDesktop={dummyVirtualDesktop} />
    );
  
    const taskbar = getByTestId("MainTaskbar");
  
    expect(taskbar.children.length).toBeTruthy();
  });
  
  test("testing taskbar open with shortcut", () => {
    const { getByTestId } = render(
      <Taskbar isNotificationViewerOpen={false} onNotificationViewerOpen={() => {}} height={50} virtualDesktop={dummyVirtualDesktop} />
    );
  
    const taskbar = getByTestId("MainTaskbar");
    expect(taskbar.children.length).toBeTruthy();
    const shortcut = getByTestId("Shortcut");
  
    fireEvent.mouseDown(shortcut.firstElementChild!);
    fireEvent.mouseUp(shortcut.firstElementChild!);
  
    expect(dummyVirtualDesktop.openedApps.length).toBe(1);
  });
})
