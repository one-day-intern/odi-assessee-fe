import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useLoginHandler } from "./useLoginHandler";

describe("Test useLoginHandler hook", () => {
  it("Test input data into store", () => {
    const { result } = renderHook(() => useLoginHandler());

    act(() => {
      result.current.setDataValue("email", "rashad@aziz.com");
    });

    expect(result.current.data.email).toBe("rashad@aziz.com");
  });

  it("Test input error into store", () => {
    const { result } = renderHook(() => useLoginHandler());

    act(() => {
      result.current.setErrorValue("email", "Please fill in this field.");
    });

    expect(result.current.errors.email).toBe("Please fill in this field.");
  });
});
