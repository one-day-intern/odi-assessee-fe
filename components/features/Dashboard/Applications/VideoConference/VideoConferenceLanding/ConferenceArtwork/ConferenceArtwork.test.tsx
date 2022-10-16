import React from "react";
import ConferenceArtwork from "./ConferenceArtwork";
import { render } from "@testing-library/react";

describe("Conference Artwork component test suite", () => {
  test("testing render component", () => {
    const { getByTestId } = render(<ConferenceArtwork />);
    getByTestId("ConferenceArtwork");
  });
});
