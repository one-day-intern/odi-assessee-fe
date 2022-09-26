import React from "react";
import FullscreenShadow from "./FullscreenShadow";
import { render } from "@testing-library/react";

const dummyDomRect: DOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON: () => {},
};

describe("Dashboard Fullscreen Shadow component test suite", () => {
  test("testing fullscreen shadow render", () => {
    const { getByTestId } = render(
      <FullscreenShadow
        bounds={dummyDomRect}
        shouldRender={true}
        startHeight={0}
        startWidth={0}
        startX={0}
        startY={0}
      />
    );

    getByTestId("fullscreen-shadow");
  });
});
