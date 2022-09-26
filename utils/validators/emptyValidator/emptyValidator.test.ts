import { emptyValidator } from "./emptyValidator"

describe("Empty Validator Test", () => {
    it("Test if input is not empty", () => {
        const input = "jo"
        expect(emptyValidator(input)[0]).toBe(true);
        expect(emptyValidator(input)[1]).toBe("");
    })
    it("Test if input is empty", () => {
        const input = ""
        expect(emptyValidator(input)[0]).toBe(false);
        expect(emptyValidator(input)[1]).toBe("Please fill in this field.");
    })
})