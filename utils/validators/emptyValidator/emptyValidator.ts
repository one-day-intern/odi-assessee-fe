const emptyValidator = (input: string): [boolean, string] => {
    if (input === "") return [false, "Please fill in this field."];

    return [true, ""]
}

export { emptyValidator }