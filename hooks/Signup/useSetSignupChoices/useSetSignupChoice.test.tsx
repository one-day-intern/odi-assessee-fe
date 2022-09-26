import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useSetSignupChoice } from "./useSetSignupChoice";

describe("Test useSetSignupChoice hook", () => {
  it("Test select signup choice", () => {
    const { result } = renderHook(() => useSetSignupChoice());
    const { signupChoices, selectChoice } = result.current;

    act(() => {
      selectChoice(2);
    });

    expect(signupChoices[1].isSelected).toBe(true);
    expect(signupChoices[0].isSelected).toBe(false);
  });
});
