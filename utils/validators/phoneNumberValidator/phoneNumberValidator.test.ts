import { phoneNumberValidator } from "./phoneNumberValidator"

describe("Phone Number Validator Test", () => {
    it("Test if input is not empty and not too long", () => {
        const input = "+123456789"
        expect(phoneNumberValidator(input)[0]).toBe(true);
        expect(phoneNumberValidator(input)[1]).toBe("");
    })
    it("Test if input is too long", () => {
        const input = "+1234567899876543210123"
        expect(phoneNumberValidator(input)[0]).toBe(false);
        expect(phoneNumberValidator(input)[1]).toBe("Phone numbers must have a maximum length of 15 characters.");
    })
    it("Test if input is empty", () => {
        const input = ""
        expect(phoneNumberValidator(input)[0]).toBe(false);
        expect(phoneNumberValidator(input)[1]).toBe("Please fill in this field.");
    })
})