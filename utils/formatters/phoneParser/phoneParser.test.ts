import { phoneParser } from "./phoneParser";

describe("Phone parser utility test suite", () => {
  it("Phone parser appends + on numbers without a leading +", () => {
    const parsedOutput = phoneParser("624111358741");
    expect(parsedOutput).toBe("+624111358741");
  });
  it("Phone parser doesn't append + on numbers with a leading -", () => {
    const parsedOutput = phoneParser("+624111358741");
    expect(parsedOutput).toBe("+624111358741");
  });
  it("Phone parser ignores empty strings", () => {
    const parsedOutput = phoneParser("");
    expect(parsedOutput).toBe("");
  });
});
