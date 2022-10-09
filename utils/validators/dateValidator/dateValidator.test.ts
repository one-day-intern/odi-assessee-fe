import { dateValidator } from "./dateValidator";

describe("Date validator test", () => {
    it("Empty string is invalid", () => {
        const [isValid, error]: [boolean, string] = dateValidator("");
        expect(isValid).toBe(false);
        expect(error).toBe("Please enter a date.");
    });

    it("Invalid date is invalid", () => {
        const [isValid, error]: [boolean, string] = dateValidator("2022-25-30");
        expect(isValid).toBe(false);
        expect(error).toBe("Please enter a valid date.");
    });

    it("Valid date is valid", () => {
        const [isValid, error]: [boolean, string] = dateValidator("2022-10-01");
        expect(isValid).toBe(true);
        expect(error).toBe("");
    })
})