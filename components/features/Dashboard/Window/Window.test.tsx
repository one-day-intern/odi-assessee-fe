import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Window from "./Window";

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
    minimized: false,
    zIndex: 0,
  },
];
const app = applications[0];

const resetApplications = () => {
  app.width = 600;
  app.height = 800;
  app.currentX = 0;
  app.currentY = 0;
  app.fullscreen = false;
  app.minimized = false;
  app.zIndex = 0;
};

const MyTestComponent = (
  <div
    className="fullscreen-bounds"
    style={{
      position: "relative",
      height: "calc(100vh - 50px)",
      width: "100vw",
    }}
  >
    <Window
      app={applications[0]}
      fullScreenBounds="fullscreen-bounds"
      onFocus={(_app) => {
        app.zIndex = 10;
      }}
      onClose={(_app) => {
        app.zIndex = -1;
      }}
      onUpdatePos={(_app, pos) => {
        app.currentX = pos.x;
        app.currentY = pos.y;
      }}
      onUpdateSize={(_app, size) => {
        app.width = size.width;
        app.height = size.height;
      }}
      toggleFullscreen={(_app, fullscreen) => {
        app.fullscreen = fullscreen;
      }}
      toggleMinimize={(_app, minimize) => {
        app.minimized = minimize;
      }}
    />
  </div>
);

describe("Dashboard Window component test suite", () => {
  beforeEach(() => {
    global.innerWidth = 1920;
    global.innerHeight = 1080;
  });
  
  afterEach(() => {
    resetApplications();
  });
  
  test("testing render window", () => {
    const { getByTestId } = render(MyTestComponent);
    getByTestId("WindowWrapper");
  });
  
  test("testing window drag", () => {
    const { getByTestId } = render(MyTestComponent);
    const dragHandle = getByTestId("window-head");
  
    fireEvent.mouseDown(dragHandle!);
    fireEvent.mouseMove(dragHandle!, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(dragHandle!, { clientX: 100, clientY: 100 });
  
    expect(app.currentX).toBe(100);
    expect(app.currentY).toBe(100);
  });
  
  test("testing window resize", () => {
    const { getByTestId } = render(MyTestComponent);
    const window = getByTestId("WindowWrapper");
    const allResizeHandles = window.firstElementChild?.lastElementChild;
    const eastResizeHandle = allResizeHandles?.children[4];
  
    const from = {
      clientX: app.width,
      clientY: app.height * 0.5,
    };
    const to = {
      clientX: from.clientX + 100,
      clientY: from.clientY,
    };
  
    expect(app.width).toBe(600);
    expect(app.height).toBe(800);
    expect(eastResizeHandle).toBeTruthy();
  
    fireEvent.mouseDown(eastResizeHandle!, from);
    fireEvent.mouseMove(eastResizeHandle!, to);
    fireEvent.mouseUp(eastResizeHandle!, to);
  
    // js-dom limitations means we can only test that resize is called
    // and sets height and width to be 0, since in js-dom elements
    // are virtualized and have no actual dimensions
    expect(app.width).toBe(0);
    expect(app.height).toBe(0);
  });
  
  test("testing window fullscreen", () => {
    const { getByTestId } = render(MyTestComponent);
    const fullscreenButton = getByTestId("window-fullscreen");
  
    fireEvent.mouseDown(fullscreenButton!);
    fireEvent.mouseUp(fullscreenButton!);
  
    expect(app.fullscreen).toBeTruthy();
  });
  
  test("testing window minimize", () => {
    const { getByTestId } = render(MyTestComponent);
    const minimizeButton = getByTestId("window-minimize");
  
    fireEvent.mouseDown(minimizeButton!);
    fireEvent.mouseUp(minimizeButton!);
  
    expect(app.minimized).toBeTruthy();
  });
  
  test("testing window focus", () => {
    const { getByTestId } = render(MyTestComponent);
    const dragHandle = getByTestId("window-head");
  
    fireEvent.mouseDown(dragHandle!);
  
    expect(app.zIndex).toBe(10);
  });
  
  test("testing window close", () => {
    const { getByTestId } = render(MyTestComponent);
    const closeButton = getByTestId("window-close");
  
    fireEvent.mouseDown(closeButton!);
    fireEvent.mouseUp(closeButton!);
  
    expect(app.zIndex).toBe(-1);
  });
})

