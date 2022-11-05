const emailValidator = (input: string): [boolean, string] => {
    if (input === "") return [false, "Please fill in this field."]

    if (!input.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return [false, "Please enter a valid email."];

    return [true, ""];
}

export { emailValidator }