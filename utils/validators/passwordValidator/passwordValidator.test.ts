import { passwordValidator } from "./passwordValidator";

describe("Password validator test", () => {
  it("Invalid Password: Less than 8 characters", () => {
    const [isValid, error] = passwordValidator("abdc");

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 8 characters");
  });

  it("Invalid Password: No numbers", () => {
    const [isValid, error] = passwordValidator("abdcdeasaADf");

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 number");
  });

  it("Invalid Password: No lowercases", () => {
    const [isValid, error] = passwordValidator("ABVSDFSAFSDC");

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 lowercase letter");
  });

  it("Invalid Password: No uppercases", () => {
    const [isValid, error] = passwordValidator("fajsdklcsxajkl");

    expect(isValid).toBe(false);
    expect(error).toBe("Your password should have at least 1 uppercase letter");
  });

  it("Valid password", () => {
    const [isValid, error] = passwordValidator("RashadAlekJoAryaIndi123");

    expect(isValid).toBe(true);
    expect(error).toBe("");
  });
});
