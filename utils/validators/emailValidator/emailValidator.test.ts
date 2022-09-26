import { emailValidator } from "./emailValidator";

describe("Email Validator test", () => {
    it("Test if email is valid", () => {
        const email = "abc@def.com";
        expect(emailValidator(email)[0]).toBe(true);
        expect(emailValidator(email)[1]).toBe("");
    })

    it("Test if email is invalid because it's not an email", () => {
        const email = "rashad";
        expect(emailValidator(email)[0]).toBe(false);
        expect(emailValidator(email)[1]).toBe("Please enter a valid email.");
    })

    it("Test if email is invalid because it's empty", () => {
        const email = "";
        expect(emailValidator(email)[0]).toBe(false);
        expect(emailValidator(email)[1]).toBe("Please fill in this field.");
    })
})