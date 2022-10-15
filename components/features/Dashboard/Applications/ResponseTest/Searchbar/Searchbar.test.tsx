import React from "react";
import Searchbar from "./Searchbar";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Searchbar component test suite", () => {
  test("testing render searchbar", () => {
    render(<Searchbar filter="" setFilter={() => {}} />);
  });
  test("testing render clear searchbar", () => {
    const { getByTestId } = render(
      <Searchbar filter="Rashad" setFilter={() => {}} />
    );
    getByTestId("ClearSearch");
  });
  test("testing focus container", () => {
    const { getByTestId } = render(
      <Searchbar filter="Rashad" setFilter={() => {}} />
    );
    const container = getByTestId("SearchEmailContainer");

    act(() => {
      fireEvent.focus(container);
    });

    expect(container.classList).toContain("focused");
  });
  test("testing onChange event", () => {
    let filtered = "";
    const { getByTestId } = render(
      <Searchbar
        filter="Rashad"
        setFilter={() => {
          filtered = "changed";
        }}
      />
    );
    const input = getByTestId("SearchEmail");

    act(() => {
      fireEvent.change(input, { target: { value: "testing" } });
    });

    expect(filtered).toBe("changed");
  });
  test("testing clear search focus", () => {
    const { getByTestId } = render(
      <Searchbar filter="Rashad" setFilter={() => {}} />
    );
    const clear = getByTestId("ClearSearch");

    act(() => {
      fireEvent.click(clear);
    });
    const container = getByTestId("SearchEmailContainer");

    expect(container.classList).toContain("focused");
  });
});
