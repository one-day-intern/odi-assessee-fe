const confirmPasswordValidator = (
  password: string,
  retypedPassword: string
): [boolean, string] => {
  if (retypedPassword === "") return [false, "Please fill in this field."];

  if (password !== retypedPassword)
    return [
      false,
      "Your password is not identical to your confirmed password.",
    ];

  return [true, ""];
};

export { confirmPasswordValidator };
