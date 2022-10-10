const dateValidator = (input: string) : [boolean, string] => {
    if (input === "") return [false, "Please enter a date."];

    const date = new Date(input);
    if (isNaN(date.getTime())) return [false, "Please enter a valid date."];

    return [true, ""];
}

export { dateValidator }