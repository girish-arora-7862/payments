export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isPositiveNumber = (number: string) => {
  let hasDecimal = false;
  if (number.length === 0) {
    return true;
  }
  for (let i = 0; i < number.length; i++) {
    if (+number[i] >= 0 && +number[i] <= 9) {
      continue;
    } else if (number[i] === "." && !hasDecimal) {
      hasDecimal = true;
      continue;
    } else {
      return false;
    }
  }
  return true;
};
