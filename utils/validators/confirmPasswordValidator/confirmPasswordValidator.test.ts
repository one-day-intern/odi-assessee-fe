import { confirmPasswordValidator } from "./confirmPasswordValidator";

describe("Confirm password validator test", () => {
  it("Test if password equal, returns true", () => {
    const [valid, error] = confirmPasswordValidator("aaAA11", "aaAA11");

    expect(valid).toBe(true);
    expect(error).toBe("");
  });
  it("Test if password not equal, returns false", () => {
    const [valid, error] = confirmPasswordValidator("aaAA11", "aaAA12");

    expect(valid).toBe(false);
    expect(error).toBe(
      "Your password is not identical to your confirmed password."
    );
  });
  it("Test if confirm password is empty, returns false", () => {
    const [valid, error] = confirmPasswordValidator("aaAA11", "");

    expect(valid).toBe(false);
    expect(error).toBe("Please fill in this field.");
  });
});
