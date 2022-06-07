import { regexOneUpperCase } from 'src/utils/form/regex';

export default function (errorMessage) {
  return this.test(`oneUppercase-valid`, errorMessage, function (value) {
    const { path, createError } = this;
    if (!value) return true;
    return regexOneUpperCase.test(value) || createError({ path, message: errorMessage });
  });
}
