const passwordValidator = (input: string): [boolean, string] => {
  let isValid = true;
  let error = "";

  // Case 4: Number
  if (!input.match(/\d/g)) {
    isValid = false;
    error = "Your password should have at least 1 number";
  }

  // Case 3: Uppercase
  if (!input.match(/[A-Z]/g)) {
    isValid = false;
    error = "Your password should have at least 1 uppercase letter";
  }

  // Case 2: Lowercase
  if (!input.match(/[a-z]/g)) {
    isValid = false;
    error = "Your password should have at least 1 lowercase letter";
  }

  // Case 1: Length < 8
  if (input.length < 8) {
    isValid = false;
    error = "Your password should have at least 8 characters";
  }

  return [isValid, error];
};

export { passwordValidator };
