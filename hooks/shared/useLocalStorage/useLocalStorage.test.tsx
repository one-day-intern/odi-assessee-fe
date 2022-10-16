import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLocalStorage } from "./useLocalStorage";
let mockLocalStorage = {};

describe("Test use local storage", () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    });
    global.Storage.prototype.removeItem = jest.fn(
      (key) => delete mockLocalStorage[key]
    );
  });

  beforeEach(() => {
    mockLocalStorage = {};
  });

  it("Test if saving works", () => {
    const { result } = renderHook(() => useLocalStorage("test"));
    const [item, setItem] = result.current;
    act(() => {
      setItem("item");
    });
    expect(mockLocalStorage["test"]).toBe("item");
  });
});
