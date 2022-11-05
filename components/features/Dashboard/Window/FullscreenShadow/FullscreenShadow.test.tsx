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

let spy: jest.SpyInstance;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
})

describe("Dashboard Fullscreen Shadow component test suite", () => {
  beforeAll(() => {
    const shadowDiv = document.createElement("div");
    document.body.appendChild(shadowDiv)
    spy.mockReturnValue(shadowDiv);
  });
  test("testing fullscreen shadow render", () => {
    const { getByTestId } = render(
      <FullscreenShadow
        zIndex={10}
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
