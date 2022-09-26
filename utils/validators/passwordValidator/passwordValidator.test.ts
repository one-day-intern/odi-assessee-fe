import { passwordValidator } from "./passwordValidator";

describe("Password validator test", () => {
  it("Invalid Password: Less than 8 characters", () => {
    const password = "abdc";
    const [isValid, error] = passwordValidator(password);

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 8 characters");
  });

  it("Invalid Password: No numbers", () => {
    const password = "abdcdeasaADf";
    const [isValid, error] = passwordValidator(password);

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 number");
  });

  it("Invalid Password: No lowercases", () => {
    const password = "ABVSDFSAFSDC";
    const [isValid, error] = passwordValidator(password);

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 lowercase letter");
  });

  it("Invalid Password: No uppercases", () => {
    const password = "fajsdklcsxajkl";
    const [isValid, error] = passwordValidator(password);

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 uppercase letter");
  });

  it("Valid password", () => {
    const password = "RashadAlekJoAryaIndi123";
    const [isValid, error] = passwordValidator(password);

    expect(isValid).toBe(true);
    expect(error).toBe("");
  });
});
