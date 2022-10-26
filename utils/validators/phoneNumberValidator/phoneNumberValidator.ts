const phoneNumberValidator = (input: string): [boolean, string] => {
    if (input === "") return [false, "Please fill in this field."];

    if (input.length > 15) return [false, "Phone numbers must have a maximum length of 15 characters."];

    return [true, ""]
}

export { phoneNumberValidator }