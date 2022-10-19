const phoneParser = (phoneNumber: string): string => {
  if (phoneNumber.length < 1) return "";

  const firstNumber = phoneNumber.at(0);
  return firstNumber === "+" ? phoneNumber : `+${phoneNumber}`;
};

export { phoneParser };
