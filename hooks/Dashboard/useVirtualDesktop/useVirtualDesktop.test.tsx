import React from "react";
import { renderHook, act } from "@testing-library/react";
import useVirtualDesktop from "./useVirtualDesktop";

const applications = [
  {
    appId: "response-test",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 200,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
  {
    appId: "interactive-quiz",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 800,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
  {
    appId: "video-conference",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 500,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
];

describe("useVirtualDesktop hook test suite", () => {
  test("testing use virtual desktop execution", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    expect(result.current.openedApps.length).toBe(0);
    expect(typeof result.current.openApp).toBe("function");
    expect(typeof result.current.closeApp).toBe("function");
    expect(typeof result.current.focusApp).toBe("function");
    expect(typeof result.current.toggleFullscreen).toBe("function");
    expect(typeof result.current.toggleMinimize).toBe("function");
    expect(typeof result.current.updateAppPosition).toBe("function");
    expect(typeof result.current.updateAppSize).toBe("function");
  });

  test("testing open app virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    // if we try to open the app twice it should not open again
    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
  });

  test("testing close app virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    act(() => {
      result.current.closeApp(result.current.openedApps[0]);
    });

    expect(result.current.openedApps.length).toBe(0);
  });

  test("testing focus app virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    act(() => {
      result.current.openApp(applications[1]);
    });

    expect(result.current.openedApps.length).toBe(2);
    expect(result.current.openedApps[1].appId).toBe(applications[1].appId);

    expect(result.current.openedApps[1].zIndex).toBeGreaterThan(
      result.current.openedApps[0].zIndex
    );

    // focusing after opening should not effect anything
    act(() => {
      result.current.focusApp(result.current.openedApps[1]);
    });
    expect(result.current.openedApps[1].zIndex).toBeGreaterThan(
      result.current.openedApps[0].zIndex
    );

    // focus the first app opened
    act(() => {
      result.current.focusApp(result.current.openedApps[0]);
    });
    expect(result.current.openedApps[1].zIndex).toBeLessThan(
      result.current.openedApps[0].zIndex
    );
  });

  test("testing update app size virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    act(() => {
      result.current.openApp(applications[1]);
    });

    expect(result.current.openedApps.length).toBe(2);
    expect(result.current.openedApps[1].appId).toBe(applications[1].appId);

    act(() => {
      result.current.updateAppSize(result.current.openedApps[0], {
        width: 100,
        height: 100,
      });
    });

    expect(result.current.openedApps[0].width).toBe(100);
    expect(result.current.openedApps[0].height).toBe(100);
  });

  test("testing toggle fullscreen virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    act(() => {
      result.current.openApp(applications[1]);
    });

    expect(result.current.openedApps.length).toBe(2);
    expect(result.current.openedApps[1].appId).toBe(applications[1].appId);

    act(() => {
      result.current.toggleFullscreen(result.current.openedApps[0], true);
    });

    expect(result.current.openedApps[0].fullscreen).toBe(true);
    expect(result.current.openedApps[1].fullscreen).toBe(false);

    act(() => {
      result.current.toggleFullscreen(result.current.openedApps[0], false);
    });

    expect(result.current.openedApps[0].fullscreen).toBe(false);
    expect(result.current.openedApps[1].fullscreen).toBe(false);
  });

  test("testing minimize app virtual desktop", () => {
    const { result } = renderHook(() => useVirtualDesktop());

    act(() => {
      result.current.openApp(applications[0]);
    });

    expect(result.current.openedApps.length).toBe(1);
    expect(result.current.openedApps[0].appId).toBe(applications[0].appId);

    act(() => {
      result.current.openApp(applications[1]);
    });

    expect(result.current.openedApps.length).toBe(2);
    expect(result.current.openedApps[1].appId).toBe(applications[1].appId);

    act(() => {
      result.current.toggleMinimize(result.current.openedApps[0], true);
    });

    expect(result.current.openedApps[0].minimized).toBe(true);
    expect(result.current.openedApps[0].zIndex).toBe(0);
    expect(result.current.openedApps[1].minimized).toBe(false);
    expect(result.current.numberOfMinimizedApps).toBe(1);

    act(() => {
      result.current.toggleMinimize(result.current.openedApps[0], false);
    });

    expect(result.current.openedApps[0].minimized).toBe(false);
    expect(result.current.openedApps[1].minimized).toBe(false);
    expect(result.current.numberOfMinimizedApps).toBe(0);
  });
});
