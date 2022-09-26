import React from "react";
import useWindowStateManager from "./useWindowStateManager";
import { render, renderHook, act } from "@testing-library/react";
import { Rnd } from "react-rnd";

interface Point {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

let bounds: HTMLElement;

const app = {
  appId: "counter",
  app: () => <></>,
  icon: () => <></>,
  width: 600,
  height: 800,
  currentX: 800,
  currentY: 100,
  fullscreen: false,
  reveal: false,
  minimized: false,
  zIndex: 0,
};
const RndComponent: Point & Size = {
  height: app.height,
  width: app.width,
  x: app.currentX,
  y: app.currentY,
};

const resetApplications = () => {
  app.width = 600;
  app.height = 800;
  app.currentX = 0;
  app.currentY = 0;
  app.fullscreen = false;
  app.reveal = false;
  app.minimized = false;
  app.zIndex = 0;
  RndComponent.height = app.height;
  RndComponent.width = app.width;
  RndComponent.x = app.currentX;
  RndComponent.y = app.currentY;
};

const dummyRnd = {
  updatePosition: ({ x, y }: Point) => {
    RndComponent.x = x;
    RndComponent.y = y;
  },
  updateSize: ({ width, height }: Size) => {
    RndComponent.width = width;
    RndComponent.height = height;
  },
} as unknown as React.ElementRef<typeof Rnd>;

beforeEach(() => {
  global.innerWidth = 1920;
  global.innerHeight = 1080;
  resetApplications();
  const { getByTestId } = render(
    <div
      data-testid="FullscreenBounds"
      className="fullscreen-bounds"
      style={{
        position: "relative",
        height: "calc(100vh - 50px)",
        width: "100vw",
      }}
    />
  );
  bounds = getByTestId("FullscreenBounds");
  bounds.getBoundingClientRect = () => ({
    bottom: 50,
    height: innerHeight - 50,
    width: innerWidth,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => {},
    x: 0,
    y: 0,
  });
});

describe("useWindowStateManager hook test suite", () => {
  test("testing use window state manager", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.bounds).toBeTruthy();
    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(typeof result.current.setToOriginalSize).toBe("function");
    expect(typeof result.current.setToOriginalSizeMobile).toBe("function");
    expect(typeof result.current.fullscreen).toBe("function");
  });

  test("testing fullscreen method", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    act(() => {
      result.current.fullscreen();
    });

    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(result.current.isPreviouslyFullscreen).toBe(false);

    act(() => {
      result.current.fullscreen();
    });

    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
  });

  test("testing setToNormalMode method", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    act(() => {
      result.current.fullscreen();
    });

    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(result.current.isPreviouslyFullscreen).toBe(false);

    act(() => {
      result.current.setToNormalMode();
    });

    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);
    expect(RndComponent.width).toBe(app.width);
    expect(RndComponent.height).toBe(app.height);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
  });

  test("testing setToOriginalSize method", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    act(() => {
      result.current.fullscreen();
    });

    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(result.current.isPreviouslyFullscreen).toBe(false);

    const mouse = {
      x: 100,
      y: 100,
    };

    const newX =
      mouse.x - app.width * (mouse.x / result.current.bounds?.width!);
    const newY = mouse.y - 10;

    const ReactMouseEvent = {
      clientX: mouse.x,
      clientY: mouse.y,
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.setToOriginalSize(ReactMouseEvent);
    });

    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(newX);
    expect(RndComponent.y).toBe(newY);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
  });

  test("testing setToOriginalSizeMobile method", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    act(() => {
      result.current.fullscreen();
    });

    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(result.current.isPreviouslyFullscreen).toBe(false);

    const mouse = {
      x: 100,
      y: 100,
    };

    const newX =
      mouse.x - app.width * (mouse.x / result.current.bounds?.width!);
    const newY = mouse.y - 10;

    const ReactTouchEvent = {
      touches: [
        {
          clientX: mouse.x,
          clientY: mouse.y,
        },
      ],
    } as unknown as React.TouchEvent;

    act(() => {
      result.current.setToOriginalSizeMobile(ReactTouchEvent);
    });

    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(newX);
    expect(RndComponent.y).toBe(newY);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
  });

  test("testing resize handler from normal to mobile mode", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.mobileMode).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);
    expect(app.fullscreen).toBe(false);
    expect(result.current.bounds?.width).toBe(global.innerWidth);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(app.fullscreen).toBe(true);
    expect(result.current.bounds?.width).toBe(global.innerWidth);
  });

  test("testing resize handler from mobile to normal mode", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.mobileMode).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);
    expect(app.fullscreen).toBe(false);
    expect(result.current.bounds?.width).toBe(global.innerWidth);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
    expect(app.fullscreen).toBe(true);
    expect(result.current.bounds?.width).toBe(global.innerWidth);

    global.innerWidth = 1920;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);
    expect(app.fullscreen).toBe(false);
    expect(result.current.bounds?.width).toBe(global.innerWidth);
  });

  test("testing fullscreen persistence after resize", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);

    act(() => {
      result.current.fullscreen();
    });

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    global.innerWidth = 1920;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
  });

  test("testing fullscreen persistence after recalling fullscreen", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );
    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);

    act(() => {
      result.current.fullscreen();
    });

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    act(() => {
      result.current.fullscreen();
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
  });

  test("testing set to original size while mobile mode", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);

    act(() => {
      result.current.fullscreen();
    });

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    const ReactMouseEvent = {
      touches: [
        {
          clientX: 100,
          clientY: 100,
        },
      ],
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.setToOriginalSize(ReactMouseEvent);
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
  });
  test("testing set to original size mobile while mobile mode", () => {
    const { result } = renderHook(() =>
      useWindowStateManager(
        app,
        (_app, fs) => {
          _app.fullscreen = fs;
        },
        "fullscreen-bounds",
        dummyRnd
      )
    );

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(false);
    expect(RndComponent.x).toBe(app.currentX);
    expect(RndComponent.y).toBe(app.currentY);

    act(() => {
      result.current.fullscreen();
    });

    expect(result.current.mobileMode).toBe(false);
    expect(result.current.isPreviouslyFullscreen).toBe(false);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    global.innerWidth = 1024;
    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);

    const ReactTouchEvent = {
      touches: [
        {
          clientX: 100,
          clientY: 100,
        },
      ],
    } as unknown as React.TouchEvent;

    act(() => {
      result.current.setToOriginalSizeMobile(ReactTouchEvent);
    });

    expect(result.current.mobileMode).toBe(true);
    expect(result.current.isPreviouslyFullscreen).toBe(true);
    expect(app.fullscreen).toBe(true);
    expect(RndComponent.x).toBe(0);
    expect(RndComponent.y).toBe(0);
  });
});
