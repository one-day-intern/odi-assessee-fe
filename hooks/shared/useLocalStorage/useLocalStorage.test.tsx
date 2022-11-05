import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLocalStorage } from "./useLocalStorage";

describe("Test use local storage", () => {
  it("Test if saving works", () => {
    const { result } = renderHook(() => useLocalStorage("test"));
    const [_, setItem] = result.current;
    act(() => {
      setItem("item");
    });
    expect(localStorage.getItem("test")).toBe("item");
  });
});
